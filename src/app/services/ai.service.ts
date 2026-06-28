//# Интеграция с локальной Qwen (генерация, prompt)
import { OpenAI } from 'openai';
import { Task } from '../../types/session';
import { SYSTEM_PROMPTS } from '../../mcp/systemPromts';
import { Client } from '@modelcontextprotocol/client';
import { McpStepLog } from '../../types/mcp';

export const openai = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'local-dev',
});

export class AIService {
  private modelName = 'SetneufPT/Qwen3.6-27B-MTP_Q3_32K_16GB-GPU';
  private mcpClient: Client;

  constructor(mcpClient: Client) {
    this.mcpClient = mcpClient;
  }

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

  async classifyShortMessage(message: string): Promise<string[]> {
    const response = await openai.chat.completions.create({
      model: this.modelName,
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

  async *executeTaskWithMcp(
    preparedMessages: any[], // Принимаем готовые сообщения от MCP промпта
    activatedLayers: Array<string>,
  ): AsyncGenerator<McpStepLog, void, unknown> {
    const messages: any[] = preparedMessages.map((msg, index) => {
      const textContent =
        typeof msg.content === 'object' && msg.content !== null
          ? msg.content.text
          : msg.content;

      // Если это самое первое сообщение, и оно пришло с сервера как маркер инструкции,
      // мы на лету превращаем его в полноценную роль 'system' для OpenAI
      if (
        index === 0 &&
        (textContent.includes('ИНСТРУКЦИЯ') ||
          textContent.includes('Вы — опытный DATA_ENGINEER'))
      ) {
        return {
          role: 'system',
          content: textContent,
        };
      }

      // Все остальные сообщения (история чата) остаются со своими ролями (user / assistant)
      return {
        role: msg.role,
        content: textContent,
      };
    });

    // 1. Запрашиваем доступные инструменты у MCP-сервера
    const mcpToolsResponse = await this.mcpClient.listTools();

    // 2. Фильтруем инструменты на основе активированных слоев
    const filteredMcpTools = mcpToolsResponse.tools.filter((tool) => {
      if (activatedLayers.includes('DATA')) return true;
      if (activatedLayers.includes('UI')) return true;
      return false;
    });

    // 3. Маппим инструменты в формат, понятный OpenAI API
    const openAiTools = filteredMcpTools.map((tool) => ({
      type: 'function' as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema,
      },
    }));

    let iterations = 0;
    const MAX_ITERATIONS = 10; // Защита от зацикливания

    while (iterations < MAX_ITERATIONS) {
      iterations++;
      yield { type: 'thinking_start' };

      // Отправляем запрос в OpenAI (или Qwen) со свежим массивом сообщений
      const stream = await openai.chat.completions.create({
        model: this.modelName,
        messages: messages,
        tools: openAiTools.length > 0 ? openAiTools : undefined,
        tool_choice: openAiTools.length > 0 ? 'auto' : undefined,
        temperature: 0.2,
        stream: true,
      });

      // Переменные для сборки полного ответа из чанков
      let fullContent = '';
      const toolCallsMap = new Map<number, any>();

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (!delta) continue;

        // Стримим текстовые рассуждения модели
        if (delta.content) {
          fullContent += delta.content;
          yield { type: 'text_chunk', text: delta.content };
        }

        // Собираем куски вызовов инструментов
        if (delta.tool_calls) {
          for (const tcDelta of delta.tool_calls) {
            if (!toolCallsMap.has(tcDelta.index)) {
              toolCallsMap.set(tcDelta.index, {
                id: tcDelta.id,
                type: 'function',
                function: { name: '', arguments: '' },
              });
            }
            const current = toolCallsMap.get(tcDelta.index);
            if (tcDelta.id) current.id = tcDelta.id;
            if (tcDelta.function?.name)
              current.function.name += tcDelta.function.name;
            if (tcDelta.function?.arguments)
              current.function.arguments += tcDelta.function.arguments;
          }
        }
      }

      // Формируем финальный объект сообщения ассистента для локальной истории цикла
      const tool_calls = Array.from(toolCallsMap.values());
      const builtMessage: any = {
        role: 'assistant',
        content: fullContent || null,
      };
      if (tool_calls.length > 0) builtMessage.tool_calls = tool_calls;

      // Сохраняем шаг ассистента в контекст текущего диалога
      messages.push(builtMessage);

      // Если модель не вызвала инструменты — задача решена, выходим
      if (tool_calls.length === 0) {
        yield {
          type: 'final_response',
          text: fullContent || 'Задача успешно выполнена.',
        };
        return;
      }

      // Последовательно выполняем собранные инструменты через MCP-клиент
      for (const toolCall of tool_calls) {
        const toolName = toolCall.function.name;
        let args: any = {};

        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch (e) {
          args = toolCall.function.arguments;
        }

        yield {
          type: 'tool_call',
          id: toolCall.id,
          name: toolName,
          arguments: args,
        };

        try {
          // Делаем реальный вызов инструмента на MCP-сервере
          const toolResult = await this.mcpClient.callTool({
            name: toolName,
            arguments: args,
          });

          yield {
            type: 'tool_result',
            id: toolCall.id,
            name: toolName,
            result: toolResult.content,
          };

          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult.content),
          });
        } catch (error: any) {
          const errorMessage = error.message || 'Ошибка выполнения инструмента';

          yield {
            type: 'tool_error',
            id: toolCall.id,
            name: toolName,
            error: errorMessage,
          };

          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify({ error: errorMessage }),
          });
        }
      }
    }

    // Если вышли за лимит итераций агента
    yield {
      type: 'final_response',
      text: 'Превышено максимальное количество шагов агента. Процесс остановлен.',
    };
  }
}
