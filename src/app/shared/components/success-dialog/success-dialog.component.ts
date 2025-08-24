import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";

// Componente de diálogo de éxito
@Component( {
  selector: 'success-dialog',
  templateUrl: './success-dialog.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule, CommonModule]
} )
export class SuccessDialog {
  constructor (
    public dialogRef: MatDialogRef<SuccessDialog>,
    @Inject( MAT_DIALOG_DATA ) public data: { message: string }
  ) { }
}
