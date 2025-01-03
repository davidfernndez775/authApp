import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces';

// se recomienda usar como nombre PrivateGuard y PublicGuard en lugar de
// isAutheticated y isNotAuthenticated

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  // inyectamos el servicio
  const authService = inject(AuthService);
  const router = inject(Router);
  // chequeamos el status
  if (authService.authStatus() === AuthStatus.notAuthenticated) return true;

  // if (authService.authStatus() === AuthStatus.checking) return false;

  // si esta autenticado retorna al usuario a la pantalla de login y
  // regresa un false
  router.navigateByUrl('/dashboard');
  return false;
};
