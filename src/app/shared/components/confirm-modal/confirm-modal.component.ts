import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  standalone: true
} )
export class ConfirmModalComponent {
  @Input() title = 'Confirmar';
  @Input() message = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
