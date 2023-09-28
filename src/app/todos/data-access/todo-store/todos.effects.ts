import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { TodosActions } from './todos.actions';
import { TodosService } from '../todos.service';

@Injectable({
  providedIn: 'root',
})
export class TodosEffect {
  getTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.get_todos),
      mergeMap(({ userId }) =>
        this.todosService.getCurrentUserTodos(userId).pipe(
          map(({ todos }) =>
            TodosActions.get_todos_success({
              todos,
            })
          ),
          catchError((errorRes: HttpErrorResponse) =>
            of(TodosActions.get_todos_error({ error: errorRes.error?.message }))
          )
        )
      )
    );
  });

  deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.delete_todo),
      mergeMap(({ todoId }) =>
        this.todosService.deleteTodo(todoId).pipe(
          map((todo) =>
            TodosActions.delete_todo_success({
              todo,
            })
          ),
          catchError((errorRes: HttpErrorResponse) =>
            of(
              TodosActions.delete_todo_error({ error: errorRes.error?.message })
            )
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private todosService: TodosService) {}
}
