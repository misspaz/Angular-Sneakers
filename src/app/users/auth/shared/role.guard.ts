import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

// ng generate guard role
export const ownerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasOwnerToken())
    return true; // puede navegar
  return router.navigate(['/auth/login']); // redirige a login
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.hasAdminToken())
    return true; // puede navegar
  return router.navigate(['/auth/login']); // redirige a login
};
