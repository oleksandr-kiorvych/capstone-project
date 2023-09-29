import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ITodo, TAddTodoRequest } from '../../shared/utils/models/todo.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  public getCurrentUserTodos(userId: number): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${environment.LOCAL_URL}/todos`);
  }

  public getSingleTodo(todoId: number): Observable<ITodo> {
    return this.http.get<ITodo>(`${environment.LOCAL_URL}/todos/${todoId}`);
  }

  public deleteTodo(todoId: number): Observable<ITodo> {
    return this.http.delete<ITodo>(`${environment.LOCAL_URL}/todos/${todoId}`);
  }

  public addTodo(todo: TAddTodoRequest): Observable<ITodo> {
    return this.http.post<ITodo>(`${environment.LOCAL_URL}/todos`, todo);
  }

  public editTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(
      `${environment.LOCAL_URL}/todos/${todo.id}`,
      todo
    );
  }
}
