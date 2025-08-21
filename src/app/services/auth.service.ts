import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  rol: string;
}

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>( null );
  currentUser$ = this.currentUserSubject.asObservable();

  setUser ( user: User ) {
    this.currentUserSubject.next( user );
  }

  getUser (): User | null {
    return this.currentUserSubject.value;
  }
}
