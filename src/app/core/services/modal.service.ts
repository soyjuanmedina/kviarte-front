import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor ( private dialog: MatDialog ) { }

  openLogin () {
    this.loginModalSubject.next( true );
  }

  closeLogin () {
    this.loginModalSubject.next( false );
  }

  // Mostrar el modal y devolver Observable
  openConfirm ( data: ConfirmModalData ): Observable<boolean> {
    const dialogRef = this.dialog.open( ConfirmDialog, {
      width: '400px',
      data
    } );

    return dialogRef.afterClosed(); // Observable<boolean>
  }

  // Método llamado por el modal para confirmar/cancelar
  confirm ( confirmed: boolean ) {
    this.confirmSubject.next( confirmed );
  }
}
