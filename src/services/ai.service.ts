//# Интеграция с локальной Qwen (генерация, prompt)
import { OpenAI } from 'openai';
import { Task } from '../types/session';
import { SYSTEM_PROMPTS } from '../tools/promts';
import { dataTools } from '../tools/data';

export const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'local-dev',
});

export class AIService {
  private modelName = 'SetneufPT/Qwen3.6-27B-MTP_Q3_32K_16GB-GPU';

  // 1. Измельчить ТЗ на массив задач
  async splitLargeSpecification(specification: string): Promise<Task[]> {
    const response = await openai.chat.completions.create({
      model: this.modelName,
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.PLANNER },
        { role: 'user', content: specification },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    try {
      const parsed = JSON.parse(response.choices[0].message.content || '{}');
      return parsed.tasks || [];
    } catch (e) {
      console.error('Ошибка парсинга плана ТЗ', e);
      return [];
    }
  }

  // 2. Классифицировать короткую реплику
  async classifyShortMessage(message: string): Promise<string[]> {
    const response = await openai.chat.completions.create({
      model: 'qwen2.5:7b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS.CLASSIFIER },
        { role: 'user', content: message },
      ],
      temperature: 0.0,
      response_format: { type: 'json_object' },
    });

    try {
      const parsed = JSON.parse(response.choices[0].message.content || '{}');
      return parsed.layers || ['DATA'];
    } catch {
      return ['DATA'];
    }
  }

  // 3. Сгенерировать действия (Tools) для конкретной атомарной задачи
  async generateActionsForTask(
    taskDescription: string,
    chatHistory: any[],
    currentSystemState: any,
  ) {
    const stateContext = `
        <CURRENT_LOW_CODE_SCHEMA>
        Ниже представлен актуальный слепок структуры системы, которая РЕАЛЬНО создана в базе данных на данный момент. 
        Используй эти ID и коды, чтобы не создавать дубликаты и привязывать новые поля/типы к существующим объектам.

        ${JSON.stringify(currentSystemState, null, 2)}
        </CURRENT_LOW_CODE_SCHEMA>
        `;

    const response = await openai.chat.completions.create({
      model: this.modelName,
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.DATA_ENGINEER + stateContext,
        },
        ...chatHistory,
        { role: 'user', content: `Выполни задачу: ${taskDescription}` },
      ],
      tools: dataTools,
      tool_choice: 'auto',
      temperature: 0.2,
    });

    const choice = response.choices[0]?.message;

    if (!choice) {
      return { type: 'text_response', text: 'Модель вернула пустой ответ.' };
    }

    if (choice.tool_calls && choice.tool_calls.length > 0) {
      return {
        type: 'action_required',
        actions: choice.tool_calls
          .map((t: any) => {
            if (t.type !== 'function') {
              return null;
            }
            return {
              id: t.id,
              functionName: t.function.name,
              arguments: JSON.parse(t.function.arguments),
            };
          })
          .filter(Boolean),
      };
    }

    return {
      type: 'text_response',
      text:
        choice.content ||
        'Я не смог определить автоматические действия для этого шага.',
    };
  }
}
