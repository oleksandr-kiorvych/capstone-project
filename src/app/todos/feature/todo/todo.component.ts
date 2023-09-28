import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../../../shared/utils/interfaces/app-state.interface';
import { selectSingleTodo } from '../../data-access/todo-store/todos.selectors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  private _todoId = Number(this.route.snapshot.paramMap.get('todoId'))!;

  public todo$ = this.store.pipe(select(selectSingleTodo(this._todoId)));

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {
    this.todo$.subscribe((val) => console.log(val));
  }
}
