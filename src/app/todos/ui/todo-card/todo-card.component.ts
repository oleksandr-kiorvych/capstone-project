import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ITodo } from '../../../shared/utils/models/todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  @Input() todo: ITodo | undefined;
}
