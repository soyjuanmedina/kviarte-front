import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
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
  if ( user.role !== 'ADMIN' ) {
    router.navigate( ['/home'] );
    return false;
  }

  return true; // Usuario ADMIN, puede acceder
};

export const profileGuard: CanActivateFn = ( route: ActivatedRouteSnapshot ) => {
  const router = inject( Router );
  const authService = inject( AuthService );
  const user = authService.getUser();

  if ( !user ) {
    router.navigate( ['/login'] );
    return false;
  }

  const idParam = route.paramMap.get( 'id' );
  const id = idParam ? +idParam : null;

  // Admin puede ver cualquier perfil
  if ( user.role === 'ADMIN' ) return true;

  // Usuario normal solo puede ver su propio perfil
  if ( id && id !== user.id ) {
    router.navigate( ['/profile'] );
    return false;
  }

  return true;
};
