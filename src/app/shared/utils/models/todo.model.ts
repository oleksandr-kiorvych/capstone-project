export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
}

export type TAddTodoRequest = Pick<ITodo, 'todo' | 'completed'>;
