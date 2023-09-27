import { createSelector } from '@ngrx/store';

import { IAppState } from '../../../shared/utils/interfaces/app-state.interface';

const currentTodosSelector = (state: IAppState) => state.todosSlice;

export const selectCurrentTodos = createSelector(
  currentTodosSelector,
  (state) => state.todos
);
