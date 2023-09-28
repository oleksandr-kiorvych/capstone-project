import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TodoFormType } from '../../utils/types/todo-form.type';
import { ITodo, TAddTodoRequest } from '../../utils/models/todo.model';

@Component({
  selector: 'app-todo-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './todo-form-modal.component.html',
  styleUrls: ['./todo-form-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormModalComponent {
  public todoForm = this.fb.nonNullable.group({
    todo: ['', [Validators.required]],
    completed: [null, Validators.required],
  });

  public get todo() {
    return this.todoForm.get('todo') as FormControl;
  }

  public get completed() {
    return this.todoForm.get('completed') as FormControl;
  }

  constructor(
    private dialogRef: DialogRef<TAddTodoRequest>,
    private fb: FormBuilder,
    @Inject(DIALOG_DATA) public data: { type: TodoFormType }
  ) {}

  public discardDialog() {
    this.dialogRef.close();
  }

  public submitForm() {
    if (this.todoForm.invalid) return;

    this.dialogRef.close({
      todo: this.todoForm.value.todo || '',
      completed: this.todoForm.value.completed || false,
    });
  }
}
