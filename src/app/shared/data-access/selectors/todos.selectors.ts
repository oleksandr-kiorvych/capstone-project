import { createSelector } from '@ngrx/store';

import { IAppState } from '../../utils/interfaces/app-state.interface';

const currentTodosSelector = (state: IAppState) => state.todosSlice;

export const selectCurrentTodos = createSelector(
  currentTodosSelector,
  (state) => state.todos
);

export const selectSingleTodo = (todoId: number) =>
  createSelector(currentTodosSelector, (state) =>
    state.todos.find((todo) => todo.id === todoId)
  );
