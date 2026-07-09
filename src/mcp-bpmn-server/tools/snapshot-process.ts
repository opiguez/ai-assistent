import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { defineTool } from '../../shared/utils/base.js';
import { bpmnXmlService } from '../services/bpmn-xml.service.js';
import { errorResponse, successResponse } from './add-element/shared.js';

// ─── In-memory snapshot store ────────────────────────────────

interface Snapshot {
  dataTypeId: string;
  xml: string;
  decor: string;
  timestamp: number;
}

// Хранилище снимков в памяти MCP-сервера
const snapshots = new Map<string, Snapshot>();
const SNAPSHOT_TTL_MS = 10 * 60 * 1000; // 10 минут

function generateSnapshotId(dataTypeId: string): string {
  // Упрощаем генерацию: ИИ намного легче оперировать чистыми строками,
  // а таймстамп в конце защитит от коллизий в памяти бэкенда
  return `snap_${dataTypeId}_${Date.now()}`;
}

function cleanExpiredSnapshots(): void {
  const now = Date.now();
  for (const [key, snap] of snapshots) {
    if (now - snap.timestamp > SNAPSHOT_TTL_MS) {
      snapshots.delete(key);
    }
  }
}

// ====================================================================
// ─── TOOL 1: Save Snapshot (Создание снимка) ────────────────────────
// ====================================================================

export const SaveSnapshotSchema = z.object({
  dataTypeId: z
    .string()
    .describe(
      'ID BPMN типа данных (модуля/процесса) для создания резервной копии схемы',
    ),
});

export async function handleSaveSnapshot(
  args: z.infer<typeof SaveSnapshotSchema>,
) {
  try {
    cleanExpiredSnapshots();

    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const xml = await bpmnXmlService.generateXml(state.parsed);
    const decor = JSON.stringify(state.model);

    // Генерируем уникальный токен снимка
    const snapshotId = generateSnapshotId(args.dataTypeId);

    // Сохраняем слепок графа схемы в память бэкенда
    snapshots.set(snapshotId, {
      dataTypeId: args.dataTypeId,
      xml,
      decor,
      timestamp: Date.now(),
    });

    return successResponse({
      snapshotId,
      dataTypeId: args.dataTypeId,
      message: `Резервный снимок схемы успешно сохранен под ID "${snapshotId}". Снимок действителен в течение 10 минут. Если ваши последующие шаги по изменению графа схемы окажутся ошибочными, вызовите инструмент восстановления, передав этот snapshotId.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при создании снимка схемы',
    );
  }
}

// ====================================================================
// ─── TOOL 2: Restore Snapshot (Восстановление из снимка) ────────────
// ====================================================================

export const RestoreSnapshotSchema = z.object({
  snapshotId: z
    .string()
    .describe('ID сохраненного ранее снимка схемы для отката изменений'),
});

export async function handleRestoreSnapshot(
  args: z.infer<typeof RestoreSnapshotSchema>,
) {
  try {
    cleanExpiredSnapshots();

    const snapshot = snapshots.get(args.snapshotId);
    if (!snapshot) {
      return errorResponse(
        `Снимок с ID "${args.snapshotId}" не найден. Возможно, он истёк (TTL 10 минут) или никогда не создавался.`,
      );
    }

    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: snapshot.dataTypeId,
      xml: snapshot.xml,
      decor: snapshot.decor,
    });

    if (!saveResult.success) {
      return errorResponse(
        saveResult.error || 'Ошибка при записи данных снимка в базу данных',
      );
    }

    return successResponse({
      snapshotId: args.snapshotId,
      dataTypeId: snapshot.dataTypeId,
      message: `Состояние процесса успешно откачено назад к резервному снимку "${args.snapshotId}". Все изменения графа, сделанные после создания снимка, аннулированы.`,
    });
  } catch (e: any) {
    return errorResponse(
      e?.message || 'Внутренняя ошибка при восстановлении процесса из снимка',
    );
  }
}

// ─── Export ─────────────────────────────────────────────────

export const snapshotProcessTools = [
  defineTool(
    'bpmn_save_snapshot',
    {
      title: 'Save Process Snapshot',
      description:
        'Сохраняет текущее состояние BPMN процесса (XML + Decor JSON) в памяти. Возвращает snapshotId для восстановления. Снимок действителен 10 минут.',
      inputSchema: SaveSnapshotSchema,
    },
    handleSaveSnapshot,
  ),
  defineTool(
    'bpmn_restore_snapshot',
    {
      title: 'Restore Process Snapshot',
      description:
        'Восстанавливает BPMN процесс из ранее сохранённого снимка. Используйте перед модификацией для возможности отката.',
      inputSchema: RestoreSnapshotSchema,
    },
    handleRestoreSnapshot,
  ),
];
