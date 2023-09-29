import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

import { selectSingleTodo } from '../../../shared/data-access/selectors/todos.selectors';
import { TodosActions } from '../../data-access/todo-store/todos.actions';
import { IAppState } from '../../../shared/utils/interfaces/app-state.interface';
import { ITodo } from '../../../shared/utils/models/todo.model';
import { TodoFormModalComponent } from '../../../todos/ui/todo-form-modal/todo-form-modal.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DialogModule,
  ],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private _todoId = Number(this.route.snapshot.paramMap.get('todoId'))!;

  public todo$ = this.store.pipe(select(selectSingleTodo(this._todoId)));

  constructor(
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private dialog: Dialog,
    private router: Router
  ) {}

  public openEditTodoDialog() {
    const dialogRef = this.dialog.open<ITodo>(TodoFormModalComponent, {
      maxWidth: 500,
      width: '100%',
      data: {
        type: 'Edit',
        todo$: this.todo$,
        todoId: this._todoId,
      },
    });

    // no need to unsubscribe, observable completes itself
    dialogRef.closed.subscribe((todo) => {
      if (!todo) return;
      this.store.dispatch(TodosActions.edit_todo({ todo }));
    });
  }

  public redirectToTodos() {
    this.router.navigate(['todos']);
  }
}
