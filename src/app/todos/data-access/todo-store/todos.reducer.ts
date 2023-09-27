import { createReducer, on } from '@ngrx/store';

import { TodosActions } from './todos.actions';
import { ITodosSlice } from '../../../shared/utils/interfaces/app-state.interface';

export const initialState: ITodosSlice = {
  isLoading: false,
  todos: [],
  error: null,
};

export const todosReducer = createReducer(
  initialState,
  on(TodosActions.get_todos, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(TodosActions.get_todos_success, (state, { todos }) => ({
    ...state,
    isLoading: false,
    error: null,
    todos: [...todos],
  })),
  on(TodosActions.get_todos_error, (state, { error }) => ({
    ...state,
    error: error,
    todos: [],
    isLoading: false,
  })),
  on(TodosActions.add_todo, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(TodosActions.add_todo_success, (state, { todo }) => ({
    ...state,
    isLoading: false,
    error: null,
    todos: [...state.todos, todo],
  })),
  on(TodosActions.edit_todo, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(TodosActions.edit_todo_success, (state, { todo }) => ({
    ...state,
    isLoading: false,
    error: null,
    todos: [
      ...state.todos.map((curTodo) =>
        todo.id === curTodo.id ? todo : curTodo
      ),
    ],
  })),
  on(TodosActions.edit_todo_error, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(TodosActions.edit_todo_error, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(TodosActions.delete_todo, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(TodosActions.delete_todo_success, (state, { todo }) => ({
    ...state,
    isLoading: false,
    error: null,
    todos: [...state.todos.filter((curTodo) => curTodo.id !== todo.id)],
  })),
  on(TodosActions.delete_todo_error, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
