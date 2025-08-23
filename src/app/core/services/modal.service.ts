import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class ModalService {
  private loginModalSubject = new BehaviorSubject<boolean>( false );
  loginModal$ = this.loginModalSubject.asObservable();

  openLogin () {
    this.loginModalSubject.next( true );
  }

  closeLogin () {
    this.loginModalSubject.next( false );
  }
}
