import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

if (!process.env.OLLAMA_MODEL) {
  const devEnvPath = path.resolve(process.cwd(), '.env.dev');
  const prodEnvPath = path.resolve(process.cwd(), '.env');

  if (fs.existsSync(devEnvPath)) {
    dotenv.config({ path: devEnvPath });
    console.log(`ℹ️ Считана конфигурация из файла: ${devEnvPath}`);
  } else if (fs.existsSync(prodEnvPath)) {
    dotenv.config({ path: prodEnvPath });
    console.log(`ℹ️ Считана конфигурация из файла: ${prodEnvPath}`);
  } else {
    console.warn(
      '⚠️ Внимание: Файлы .env/.env.dev не найдены. Ожидаются переменные из окружения системы/Docker.',
    );
  }
} else {
  console.log(
    'ℹ️ Конфигурация успешно загружена напрямую из окружения системы/Docker.',
  );
}

const envSchema = z.object({
  //OLLAMA_URL: z.string().min(1, 'Адрес Ollama сервера обязателен'),
  //OLLAMA_MODEL: z.string().min(1, 'Модель Ollama обязательна'),
  PLATFORM_USERNAME: z.string().min(1),
  PLATFORM_PASSWORD: z.string().min(1),
  GRAPHQL_ADRESS: z.url('Некорректный URL для GRAPHQL_URL'),
  // RABIS_NUXEO_USERNAME: z.string().min(1),
  // RABIS_NUXEO_PASSWORD: z.string().min(1),
  LOCAL_SERVER_URL_NO_PORT: z.url(
    'Некорректный URL для LOCAL_SERVER_URL_NO_PORT',
  ),
  PORT_MCP1: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default(3002),
  PORT_MCP_BPMN: z
    .string()
    .transform(Number)
    .pipe(z.number().positive())
    .default(3003),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Ошибка в переменных окружения (.env.dev):');
  console.error(JSON.stringify(z.treeifyError(parsedEnv.error), null, 2));
  process.exit(1); // Останавливаем приложение, если конфиг неверный
}

export const ENV = parsedEnv.data;

export type EnvConfig = z.infer<typeof envSchema>;
