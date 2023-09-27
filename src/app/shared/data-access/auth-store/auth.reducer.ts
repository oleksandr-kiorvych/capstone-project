import { createReducer, on } from '@ngrx/store';
import { IUserSlice } from '../../utils/interfaces/app-state.interface';
import { AuthActions } from './auth.actions';

export const initialState: IUserSlice = {
  isLoading: false,
  currentUser: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    error: null,
    isLoading: true,
  })),
  on(AuthActions.login_success, (state, { currentUser }) => ({
    ...state,
    currentUser,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.login_failure, (state, { error }) => ({
    ...state,
    error: error,
    isLoading: false,
  }))
);
