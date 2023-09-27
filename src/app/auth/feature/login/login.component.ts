import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/shared/data-access/auth-store/auth.actions';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public authForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  public get username() {
    return this.authForm.get('username') as FormControl;
  }

  public get password() {
    return this.authForm.get('password') as FormControl;
  }

  constructor(private fb: FormBuilder, private store: Store) {}

  public onSubmit() {
    if (this.authForm.invalid) return;

    console.log({
      username: this.username.value,
      password: this.password.value,
    });

    this.store.dispatch(
      AuthActions.login({
        username: this.username.value,
        password: this.password.value,
      })
    );
  }
}
