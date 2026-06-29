//# Интеграция с локальной Qwen (генерация, prompt)
import { OpenAI } from 'openai';
import { Task } from '../../types/session';
import { SYSTEM_PROMPTS } from '../../mcp/systemPromts';
import { Client } from '@modelcontextprotocol/client';
import { McpStepLog } from '../../types/mcp';
import { jsonrepair } from 'jsonrepair';

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
    try {
      const response = await openai.chat.completions.create({
        model: this.modelName,
        messages: [
          { role: 'system', content: SYSTEM_PROMPTS.PLANNER },
          { role: 'user', content: specification },
        ],
        temperature: 0.1,
        response_format: { type: 'json_object' },
        max_tokens: 4000,
      });

      let rawContent = response.choices[0]?.message?.content || '{}';

      // Очистка от Markdown
      rawContent = rawContent.trim();
      if (rawContent.startsWith('```')) {
        rawContent = rawContent
          .replace(/^```(?:json)?\n?/i, '')
          .replace(/```$/, '')
          .trim();
      }

      // Безопасный парсинг
      try {
        const parsed = JSON.parse(rawContent);
        return this.validateAndNormalizeTasks(parsed.tasks);
      } catch (parseError) {
        console.warn('[Planner] JSON невалиден, запускаем jsonrepair...');
        try {
          const repairedContent = jsonrepair(rawContent);
          const parsed = JSON.parse(repairedContent);
          return this.validateAndNormalizeTasks(parsed.tasks);
        } catch (repairError) {
          console.error(
            '[Planner] Критическая ошибка: jsonrepair не смог спасти строку:',
            rawContent,
          );
          return [];
        }
      }
    } catch (apiError) {
      console.error('[Planner] Ошибка вызова API:', apiError);
      return [];
    }
  }

  private validateAndNormalizeTasks(rawTasks: any[]): Task[] {
    if (!Array.isArray(rawTasks)) return [];

    const validLayers = ['DATA', 'BPMN', 'UI'];

    return rawTasks.map((t: any) => {
      const rawLayer = String(t.layer || 'DATA').toUpperCase();
      // Проверяем, входит ли слой в разрешенные, иначе даем фолбек на 'DATA'
      const layer = validLayers.includes(rawLayer)
        ? (rawLayer as 'DATA' | 'BPMN' | 'UI')
        : 'DATA';

      return {
        layer,
        task: String(
          t.task || `task_${Math.random().toString(36).substr(2, 5)}`,
        ),
        description: String(t.description || t.task || 'Пустая задача'),
      };
    });
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
    preparedMessages: any[],
    activatedLayers: Array<string>,
  ): AsyncGenerator<McpStepLog, void, unknown> {
    const messages: any[] = preparedMessages.map((msg, index) => {
      const textContent =
        typeof msg.content === 'object' && msg.content !== null
          ? msg.content.text
          : msg.content;

      // Первое сообщение из генератора контекста ВСЕГДА должно быть системным промптом для LLM.
      // Мы явно форсируем роль 'system' для index === 0, либо доверяем роли от MCP сервера.
      const determinedRole = index === 0 ? 'system' : msg.role || 'user';

      return {
        role: determinedRole,
        content: textContent,
      };
    });

    let mcpToolsResponse;
    try {
      mcpToolsResponse = await this.mcpClient.listTools();
    } catch (mcpError) {
      console.error(
        '[AI Service] Не удалось получить список инструментов:',
        mcpError,
      );
      yield {
        type: 'tool_error',
        id: 'mcp-init',
        name: 'listTools',
        error: 'MCP сервер недоступен',
      };
      mcpToolsResponse = { tools: [] }; // Продолжаем работу без инструментов, чтобы не упал стрим
    }

    // Фильтруем инструменты. Предполагается, что в названии инструмента или описании
    const filteredMcpTools = mcpToolsResponse.tools.filter((tool: any) => {
      const layers = activatedLayers.length > 0 ? activatedLayers : ['DATA'];

      return layers.some((layer) => {
        const prefix = `${layer.toLowerCase()}_`;
        return tool.name.toLowerCase().startsWith(prefix);
      });
    });

    const openAiTools = filteredMcpTools.map((tool) => ({
      type: 'function' as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema,
      },
    }));

    let iterations = 0;
    const MAX_ITERATIONS = 10;

    while (iterations < MAX_ITERATIONS) {
      iterations++;
      yield { type: 'thinking_start' };

      let stream;
      try {
        stream = await openai.chat.completions.create({
          model: this.modelName,
          messages: messages,
          tools: openAiTools.length > 0 ? openAiTools : undefined,
          tool_choice: openAiTools.length > 0 ? 'auto' : undefined,
          temperature: 0.2,
          stream: true,
        });
      } catch (llmError: any) {
        console.error('[AI Service] Ошибка вызова LLM:', llmError);
        yield {
          type: 'critical_error',
          error: 'Ошибка локальной языковой модели.',
        };
        return;
      }

      let fullContent = '';
      const toolCallsMap = new Map<number, any>();

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (!delta) continue;

        if (delta.content) {
          fullContent += delta.content;
          yield { type: 'text_chunk', text: delta.content };
        }

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

      const tool_calls = Array.from(toolCallsMap.values());
      const builtMessage: any = {
        role: 'assistant',
        content: fullContent || null,
      };
      if (tool_calls.length > 0) builtMessage.tool_calls = tool_calls;

      messages.push(builtMessage);

      if (tool_calls.length === 0) {
        yield {
          type: 'final_response',
          text: fullContent || 'Задача успешно выполнена.',
        };
        return;
      }

      //Сначала отправляем логи вызовов в UI (синхронно, перед запуском задач)
      for (const toolCall of tool_calls) {
        let args: any = {};
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = toolCall.function.arguments;
        }

        yield {
          type: 'tool_call',
          id: toolCall.id,
          name: toolCall.function.name,
          arguments: args,
        };
      }

      // 2. Запускаем все тяжелые MCP-запросы ОДНОВРЕМЕННО через Promise.all
      const toolPromises = tool_calls.map(async (toolCall) => {
        const toolName = toolCall.function.name;
        let args: any = {};
        try {
          args = JSON.parse(toolCall.function.arguments);
        } catch {
          args = toolCall.function.arguments;
        }

        try {
          const toolResult = await this.mcpClient.callTool({
            name: toolName,
            arguments: args,
          });
          return {
            id: toolCall.id,
            name: toolName,
            success: true,
            payload: toolResult.content,
          };
        } catch (error: any) {
          return {
            id: toolCall.id,
            name: toolName,
            success: false,
            payload: error.message || 'Ошибка выполнения инструмента',
          };
        }
      });

      const executedTools = await Promise.all(toolPromises);

      // 3. Отдаем результаты в UI-стрим и пушим их в историю контекста для LLM
      for (const res of executedTools) {
        if (res.success) {
          yield {
            type: 'tool_result',
            id: res.id,
            name: res.name,
            result: res.payload,
          };

          messages.push({
            role: 'tool',
            tool_call_id: res.id,
            content: JSON.stringify(res.payload),
          });
        } else {
          yield {
            type: 'tool_error',
            id: res.id,
            name: res.name,
            error: res.payload,
          };

          messages.push({
            role: 'tool',
            tool_call_id: res.id,
            content: JSON.stringify({ error: res.payload }),
          });
        }
      }
    }

    yield {
      type: 'final_response',
      text: 'Превышено максимальное количество шагов агента. Процесс остановлен.',
    };
  }
}
