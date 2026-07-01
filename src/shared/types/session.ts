export interface Task {
  layer: 'DATA' | 'BPMN' | 'UI';
  task: string;
  description: string;
  blocked?: boolean;
  blocker?: string;
}

export interface ChatSession {
  sessionId: string;
  mode: 'NORMAL_CHAT' | 'CHUNK_PROCESSING';
  currentStepIndex: number;
  tasksQueue: Task[];
  chatHistory: { role: 'user' | 'assistant' | 'system'; content: string }[];
}
