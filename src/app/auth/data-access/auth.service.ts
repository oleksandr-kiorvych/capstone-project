import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.development';
import { PersistanceService } from '../../shared/utils/services/persistance.service';
import { IUser } from '../../shared/utils/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private persistanceService: PersistanceService
  ) {}

  public login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(`${environment.API_URL}/auth/login`, {
      username,
      password,
    });
  }

  public initialize() {
    const currentUserId = this.persistanceService.get('currentUserId');

    if (!currentUserId) {
      return null;
    }

    return this.http.get(`${environment.API_URL}/users/${currentUserId}`);
  }
}
