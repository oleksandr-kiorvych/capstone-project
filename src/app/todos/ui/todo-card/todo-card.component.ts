import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { ITodo } from '../../../shared/utils/models/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Output() deleteEvent = new EventEmitter<Event>();
  @Output() openTodoEvent = new EventEmitter<number>();

  @Input() todo!: ITodo;

  public deleteTodo(e: Event) {
    this.deleteEvent.emit(e);
  }

  public openTodo(todoId: number | undefined) {
    this.openTodoEvent.emit(todoId);
  }
}
