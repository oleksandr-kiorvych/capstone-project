import jwtDecode from 'jwt-decode';
import { IUser } from '../models/user.model';

export const decodeToken = (): IUser | void => {
  const token = localStorage.getItem('accessToken')?.toString();
  if (!token) return;
  return jwtDecode(token) as IUser;
};
