import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { decodeToken } from 'src/app/shared/utils/funcs/decode-token.func';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const currentUser = decodeToken();

  // normally we would verify validity of the token on server
  if (!currentUser || !currentUser.id) {
    router.navigate(['auth']);
    return false;
  }

  return true;
};
