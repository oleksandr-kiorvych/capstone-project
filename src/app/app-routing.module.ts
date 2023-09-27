import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
