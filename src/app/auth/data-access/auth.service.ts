import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/data-access/persistance.service';
import { IUser } from 'src/app/shared/utils/models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private persistanceService: PersistanceService
  ) {}

  public login(username: string, password: string): Observable<IUser> {
    console.log('asdas');
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
