import { Store } from '@ngrx/store';
import { Observable, of, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

import { IUser } from '../../shared/utils/models/user.model';
import { PersistanceService } from '../../shared/utils/services/persistance.service';
import { AuthActions } from '../../shared/data-access/auth-store/auth.actions';

export function initializeAppFactory(
  getUserByIdService: GetUserByIdService,
  persistanceService: PersistanceService,
  router: Router,
  store: Store
): () => Observable<any> {
  //if token is absent, send user to the auth page
  const accessToken: string = persistanceService.get('accessToken');
  if (!accessToken) {
    router.navigateByUrl('/auth');
    return () => of([]);
  }

  // this is of course wrong approach, normally we would first verify the validity of the token on server
  // and then get currentUser based on it, but the API is quite limited, so this is rather mocked functionality

  const userData: IUser = jwtDecode(accessToken);

  return () =>
    getUserByIdService.getUserById(userData.id).pipe(
      tap((user) => {
        store.dispatch(
          AuthActions.login({
            username: user.username,
            password: user.password,
          })
        );

        return of([]);
      })
    );
}

//ideallly it would be token validation service
@Injectable({ providedIn: 'root' })
export class GetUserByIdService {
  constructor(private http: HttpClient) {}

  public getUserById(id: number): Observable<IUser & { password: string }> {
    return this.http.get<IUser & { password: string }>(
      `${environment.API_URL}/users/${id}`
    );
  }
}
