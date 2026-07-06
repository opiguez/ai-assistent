import { z } from 'zod';
import { bpmnSchemaService } from '../services/bpmn-schema.service.js';
import { defineTool } from '../../shared/utils/base.js';

// ─── In-memory snapshot store ────────────────────────────────

interface Snapshot {
  dataTypeId: string;
  xml: string;
  decor: string;
  timestamp: number;
}

const snapshots = new Map<string, Snapshot>();
const SNAPSHOT_TTL_MS = 10 * 60 * 1000; // 10 минут

function generateSnapshotId(dataTypeId: string): string {
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

// ─── Save Snapshot ──────────────────────────────────────────

const SaveSnapshotSchema = z.object({
  dataTypeId: z.string().describe('ID BPMN типа данных'),
});

async function handleSaveSnapshot(args: { dataTypeId: string }) {
  try {
    cleanExpiredSnapshots();

    const state = await bpmnSchemaService.loadAndParseProcess(args.dataTypeId);

    const xml = await (await import('../services/bpmn-xml.service.js')).bpmnXmlService.generateXml(
      state.parsed,
    );
    const decor = JSON.stringify(state.model);

    const snapshotId = generateSnapshotId(args.dataTypeId);

    snapshots.set(snapshotId, {
      dataTypeId: args.dataTypeId,
      xml,
      decor,
      timestamp: Date.now(),
    });

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            snapshotId,
            message: `Снимок сохранён. Действителен ${SNAPSHOT_TTL_MS / 60000} мин.`,
          }),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка создания снимка',
          }),
        },
      ],
    };
  }
}

// ─── Restore Snapshot ───────────────────────────────────────

const RestoreSnapshotSchema = z.object({
  snapshotId: z.string().describe('ID снимка для восстановления'),
});

async function handleRestoreSnapshot(args: { snapshotId: string }) {
  try {
    cleanExpiredSnapshots();

    const snapshot = snapshots.get(args.snapshotId);
    if (!snapshot) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: `Снимок "${args.snapshotId}" не найден или истёк`,
            }),
          },
        ],
      };
    }

    const saveResult = await bpmnSchemaService.saveProcess({
      dataTypeId: snapshot.dataTypeId,
      xml: snapshot.xml,
      decor: snapshot.decor,
    });

    if (!saveResult.success) {
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              status: 'error',
              message: saveResult.error || 'Ошибка восстановления',
            }),
          },
        ],
      };
    }

    // Удаляем снимок после восстановления
    snapshots.delete(args.snapshotId);

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'success',
            snapshotId: args.snapshotId,
            message: 'Процесс восстановлен из снимка',
          }),
        },
      ],
    };
  } catch (e: any) {
    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            status: 'error',
            message: e?.message || 'Ошибка восстановления снимка',
          }),
        },
      ],
    };
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
