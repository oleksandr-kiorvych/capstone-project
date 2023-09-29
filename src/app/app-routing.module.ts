import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { todoResolver } from './todos/utils/todo.resolver';
import { authGuard } from './core/guards/auth.guard';
import { todosResolver } from './todos/utils/todos.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos',
  },
  {
    path: 'todos/:todoId',
    resolve: { todo: todoResolver },
    canActivate: [authGuard],
    loadComponent: () =>
      import('./todos/feature/todo/todo.component').then(
        (c) => c.TodoComponent
      ),
  },
  {
    path: 'todos',
    canActivate: [authGuard],
    resolve: { todos: todosResolver },
    loadComponent: () =>
      import('./todos/feature/todo-list/todo-list.component').then(
        (c) => c.TodoListComponent
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/feature/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
