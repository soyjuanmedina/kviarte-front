import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component( {
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule]
} )
export class ConfirmDialog {
  constructor (
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject( MAT_DIALOG_DATA ) public data: { title: string; message: string }
  ) { }

  onConfirm () {
    this.dialogRef.close( true );
  }

  onCancel () {
    this.dialogRef.close( false );
  }
}
