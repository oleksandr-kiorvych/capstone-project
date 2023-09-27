export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export type TAddTodoRequest = Pick<ITodo, 'todo' | 'userId' | 'completed'>;
