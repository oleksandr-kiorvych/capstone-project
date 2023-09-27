import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { AuthActions } from './auth.actions';
import { IUser } from '../../utils/models/user.model';
import { PersistanceService } from '../persistance.service';
import { AuthService } from '../../../auth/data-access/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthEffect {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((user: IUser) => {
            this.persistanceService.set('accessToken', user.token);
            return AuthActions.login_success({
              currentUser: user,
            });
          }),
          catchError((errorRes: HttpErrorResponse) =>
            of(AuthActions.login_failure({ error: errorRes.error?.message }))
          )
        )
      )
    );
  });

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login_success),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
