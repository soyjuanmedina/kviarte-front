import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>( null );
  currentUser$ = this.currentUserSubject.asObservable();

  constructor () {
    const loginData = localStorage.getItem( 'login' );
    if ( loginData ) {
      const parsed = JSON.parse( loginData );
      this.currentUserSubject.next( parsed.user );
    }
  }

  setUser ( user: any ) {
    this.currentUserSubject.next( user );
  }

  getUser (): User | null {
    return this.currentUserSubject.value;
  }
}
