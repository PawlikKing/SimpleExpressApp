import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirm-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Confirm' }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="ref.close(false)">Cancel</button>
      <button mat-button color="warn" (click)="ref.close(true)">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class ConfirmModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ref: MatDialogRef<ConfirmModalComponent>,
  ) {}
}
