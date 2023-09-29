import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { TodosActions } from './todos.actions';
import { TodosService } from '../todos.service';
import { selectCurrentUser } from '../../../shared/data-access/auth-store/auth.selectors';
import { IAppState } from '../../../shared/utils/interfaces/app-state.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosEffect {
  getTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.get_todos),
      mergeMap(({ userId }) =>
        this.todosService.getCurrentUserTodos(userId).pipe(
          map((todos) =>
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

  getSingleTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.get_single_todo),
      mergeMap(({ todoId }) =>
        this.todosService.getSingleTodo(todoId).pipe(
          map((todo) =>
            TodosActions.get_single_todo_success({
              todo,
            })
          ),
          catchError((errorRes: HttpErrorResponse) =>
            of(
              TodosActions.get_single_todo_failure({
                error: errorRes.error?.message,
              })
            )
          )
        )
      )
    );
  });

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.add_todo),
      mergeMap(({ todo }) =>
        this.todosService.addTodo(todo).pipe(
          map((todo) =>
            TodosActions.add_todo_success({
              todo,
            })
          ),
          catchError((errorRes: HttpErrorResponse) =>
            of(TodosActions.add_todo_error({ error: errorRes.error?.message }))
          )
        )
      )
    );
  });

  editTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.edit_todo),
      mergeMap(({ todo }) =>
        this.todosService.editTodo(todo).pipe(
          map((todo) =>
            TodosActions.edit_todo_success({
              todo,
            })
          ),
          catchError((errorRes: HttpErrorResponse) =>
            of(TodosActions.edit_todo_error({ error: errorRes.error?.message }))
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
          map(() =>
            TodosActions.delete_todo_success({
              todoId,
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

  constructor(
    private actions$: Actions,
    private todosService: TodosService,
    private store: Store<IAppState>
  ) {}
}
