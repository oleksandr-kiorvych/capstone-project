import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { TodoFormType } from '../../utils/types/todo-form.type';

@Component({
  selector: 'app-todo-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './todo-form-modal.component.html',
  styleUrls: ['./todo-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormModalComponent {
  constructor(
    private dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: { type: TodoFormType }
  ) {}
}
