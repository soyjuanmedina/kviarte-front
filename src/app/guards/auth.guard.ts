import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

export const registerGuard: CanActivateFn = () => {
  const router = inject( Router );
  const authService = inject( AuthService );

  const user = authService.getUser();



  // Si no hay usuario logueado, redirigir a login
  if ( !user ) {
    return true;
  }

  // Si el usuario no es ADMIN, redirigir a home
  if ( user.rol !== 'ADMIN' ) {
    router.navigate( ['/home'] );
    return false;
  }

  return true; // Usuario ADMIN, puede acceder
};
