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

  //ideally we would get user todos by setting token in headers, but API does not allow it, so we use userId
  public getCurrentUserTodos(userId: number): Observable<{ todos: ITodo[] }> {
    return this.http.get<{ todos: ITodo[] }>(
      `${environment.API_URL}/todos/user/${userId}`
    );
  }

  public getSingleTodo(todoId: number): Observable<ITodo> {
    return this.http.get<ITodo>(`${environment.API_URL}/todos/${todoId}`);
  }

  //deleting todo won't delete it on server, this is mocking
  public deleteTodo(todoId: number): Observable<ITodo> {
    return this.http.delete<ITodo>(`${environment.API_URL}/todo/${todoId}`);
  }

  // adding todo won't add it to server, just return new todo with an ID
  // therefore it's not possible to delete or edit current todo
  public addTodo(
    todo: TAddTodoRequest & { userId: number }
  ): Observable<ITodo> {
    return this.http.post<ITodo>(`${environment.API_URL}/todos/add`, todo);
  }

  // editing todo won't edit it on server, but return edited todo with modified data
  public editTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${environment.API_URL}/todo/${todo.id}`, todo);
  }
}
