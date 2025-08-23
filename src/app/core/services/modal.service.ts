import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ConfirmModalData {
  title: string;
  message: string;
}

@Injectable( { providedIn: 'root' } )
export class ModalService {
  private confirmDataSubject = new BehaviorSubject<ConfirmModalData | null>( null );
  confirmData$ = this.confirmDataSubject.asObservable();

  private confirmSubject = new Subject<boolean>();
  private loginModalSubject = new BehaviorSubject<boolean>( false );
  loginModal$ = this.loginModalSubject.asObservable();

  openLogin () {
    this.loginModalSubject.next( true );
  }

  closeLogin () {
    this.loginModalSubject.next( false );
  }

  // Mostrar el modal y devolver Observable
  openConfirm ( data: ConfirmModalData ): Observable<boolean> {
    this.confirmDataSubject.next( data );

    return new Observable<boolean>( observer => {
      const subscription = this.confirmSubject.subscribe( confirmed => {
        observer.next( confirmed );
        observer.complete();
        subscription.unsubscribe();
        this.confirmDataSubject.next( null );
      } );
    } );
  }

  // Método llamado por el modal para confirmar/cancelar
  confirm ( confirmed: boolean ) {
    this.confirmSubject.next( confirmed );
  }
}
