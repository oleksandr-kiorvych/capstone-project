import { ITodo } from '../models/todo.model';
import { IUser } from '../models/user.model';

interface IBaseSlice {
  isLoading: boolean;
  error: any | null;
}

export interface IUserSlice extends IBaseSlice {
  currentUser: IUser | null;
}

export interface ITodosSlice extends IBaseSlice {
  todos: ITodo[];
}

export interface IAppState {
  userSlice: IUserSlice;
  todosSlice: ITodosSlice;
}
