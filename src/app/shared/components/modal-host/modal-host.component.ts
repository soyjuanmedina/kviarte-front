import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ModalService } from '../../../core/services/modal.service';

@Component( {
  selector: 'app-modal-host',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent],
  template: `
    <app-confirm-modal
      *ngIf="confirmData"
      [title]="confirmData.title"
      [message]="confirmData.message"
      (confirm)="handleConfirm()"
      (cancel)="handleCancel()">
    </app-confirm-modal>
  `
} )
export class ModalHostComponent {
  confirmData: { title: string; message: string } | null = null;

  constructor ( private modalService: ModalService ) {
    this.modalService.confirmData$.subscribe( data => {
      this.confirmData = data;
    } );
  }

  handleConfirm () {
    this.modalService.confirm( true );
    this.confirmData = null;
  }

  handleCancel () {
    this.modalService.confirm( false );
    this.confirmData = null;
  }
}
