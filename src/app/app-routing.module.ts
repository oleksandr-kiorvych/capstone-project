import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { todoResolver } from './todos/utils/todo.resolver';

const routes: Routes = [
  {
    path: 'todos/:todoId',
    resolve: { todo: todoResolver },
    loadComponent: () =>
      import('./todos/feature/todo/todo.component').then(
        (c) => c.TodoComponent
      ),
  },
  {
    path: 'todos',
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
