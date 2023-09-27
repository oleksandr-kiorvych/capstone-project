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
  public getCurrentUserTodos(userId: number): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(`${environment.API_URL}/todos/${userId}`);
  }

  //deleting todo won't delete it on server, this is mocking
  public deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL}/todo/${todoId}`);
  }

  // adding todo won't add it to server, just return new todo with an ID
  public addTodo(todo: TAddTodoRequest): Observable<ITodo> {
    return this.http.post<ITodo>(`${environment.API_URL}/todos/add`, todo);
  }

  // editing todo won't edit it on server, but return edited todo with modified data
  public editTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${environment.API_URL}/todo/${todo.id}`, todo);
  }
}
