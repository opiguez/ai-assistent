export type McpStepLog =
  | { type: 'thinking_start' }
  | { type: 'text_chunk'; text: string } // Сюда летят кусочки текста в реальном времени
  | { type: 'tool_call'; id: string; name: string; arguments: any }
  | { type: 'tool_result'; id: string; name: string; result: any }
  | { type: 'tool_error'; id: string; name: string; error: string }
  | { type: 'critical_error'; error: string }
  | { type: 'final_response'; text: string };
