import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { of, first, switchMap } from 'rxjs';

import { TodosActions } from '../data-access/todo-store/todos.actions';
import { selectCurrentTodos } from '../../shared/data-access/selectors/todos.selectors';
import { IAppState } from '../../shared/utils/interfaces/app-state.interface';
import { ITodo } from '../../shared/utils/models/todo.model';

export const todosResolver: ResolveFn<ITodo[]> = (route, state) => {
  const store = inject(Store<IAppState>);

  return store.pipe(
    select(selectCurrentTodos),
    first(),
    switchMap((todos) => {
      if (!todos.length) {
        store.dispatch(TodosActions.get_todos());
      }
      return of([]);
    })
  );
};
