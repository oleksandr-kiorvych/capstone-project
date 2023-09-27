import { IUser } from '../models/user.model';

export interface IUserSlice {
  isLoading: boolean;
  currentUser: IUser | null;
  error: never | null;
}

export interface IAppState {
  userSlice: IUserSlice;
}
