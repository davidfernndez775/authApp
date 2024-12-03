import { CanActivateFn } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  console.log('is authenticated guard');
  console.log(route, state);

  return true;
};
