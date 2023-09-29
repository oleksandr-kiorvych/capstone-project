import { createActionGroup, props } from '@ngrx/store';
import { IUser } from '../../../shared/utils/models/user.model';

export const AuthActions = createActionGroup({
  source: 'auth',
  events: {
    login: props<{ username: string; password: string }>(),
    login_success: props<{ currentUser: IUser }>(),
    login_failure: props<{ error: any }>(),
  },
});
