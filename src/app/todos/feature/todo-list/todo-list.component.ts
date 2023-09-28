import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

import { EMPTY, switchMap, tap } from 'rxjs';

import { TodosActions } from '../../data-access/todo-store/todos.actions';
import { selectCurrentTodos } from '../../data-access/todo-store/todos.selectors';
import { TodoCardComponent } from '../../ui/todo-card/todo-card.component';
import { selectCurrentUser } from '../../../shared/data-access/auth-store/auth.selectors';
import { IAppState } from '../../../shared/utils/interfaces/app-state.interface';
import {
  ITodo,
  TAddTodoRequest,
} from '../../../shared/utils/models/todo.model';
import { TodoFormModalComponent } from '../../../shared/ui/todo-form-modal/todo-form-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    TodoCardComponent,
    MatIconModule,
    MatButtonModule,
    DialogModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  public currentUserTodos$ = this.store.select(selectCurrentUser).pipe(
    tap((currentUser) => {
      if (!currentUser) return EMPTY;
      return this.store.dispatch(
        TodosActions.get_todos({ userId: currentUser.id })
      );
    }),
    switchMap(() => this.store.pipe(select(selectCurrentTodos)))
  );

  constructor(
    private store: Store<IAppState>,
    private dialog: Dialog,
    private router: Router
  ) {}

  public openAddTodoDialog() {
    const dialogRef = this.dialog.open<TAddTodoRequest>(
      TodoFormModalComponent,
      {
        maxWidth: 500,
        width: '100%',
        data: {
          type: 'Add',
        },
      }
    );

    // no need to unsubscribe, observable completes itself
    dialogRef.closed.subscribe((todo) => {
      if (!todo) return;
      this.store.dispatch(TodosActions.add_todo({ todo }));
    });
  }

  public openTodo(todoId: number) {
    this.router.navigate(['/todos', todoId]);
  }

  public deleteTodo(todoId: number) {
    this.store.dispatch(TodosActions.delete_todo({ todoId }));
  }

  public trackByTodos(index: number, todo: ITodo) {
    return todo.id;
  }
}
