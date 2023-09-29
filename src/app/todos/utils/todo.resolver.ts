import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { first, of, switchMap } from 'rxjs';

import { selectCurrentTodos } from '../../shared/data-access/selectors/todos.selectors';
import { TodosActions } from '../data-access/todo-store/todos.actions';
import { IAppState } from '../../shared/utils/interfaces/app-state.interface';
import { decodeToken } from '../../shared/utils/funcs/decode-token.func';
import { ITodo } from '../../shared/utils/models/todo.model';

export const todoResolver: ResolveFn<ITodo[]> = (route, state) => {
  const store = inject(Store<IAppState>);

  const todoId = Number(route.params['todoId']);

  return store.pipe(
    select(selectCurrentTodos),
    first(),
    switchMap((todos) => {
      const currentTodo = todos.find((todo) => todoId === todo.id);
      if (!currentTodo) {
        store.dispatch(TodosActions.get_single_todo({ todoId }));
      }
      return of([]);
    })
  );
};
