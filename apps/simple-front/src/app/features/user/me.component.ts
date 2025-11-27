import { Component } from '@angular/core';
import { AuthService, User } from '../../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/ui/confirm-modal.component';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  template: `
    <mat-card *ngIf="user">
      <h3>Account</h3>
      <p><b>Username:</b> {{ user.username }}</p>
      <p><b>Email:</b> {{ user.email }}</p>

      <form [formGroup]="uform" (ngSubmit)="changeUsername()">
        <mat-form-field appearance="fill"
          ><mat-label>Change username</mat-label>
          <input matInput formControlName="username" />
        </mat-form-field>
        <button mat-button color="primary">Change</button>
      </form>

      <form [formGroup]="eform" (ngSubmit)="changeEmail()">
        <mat-form-field appearance="fill"
          ><mat-label>Change email</mat-label>
          <input matInput formControlName="email" />
        </mat-form-field>
        <button mat-button color="primary">Change</button>
      </form>

      <div style="margin-top:12px">
        <button mat-stroked-button color="warn" (click)="confirmRemove()">Remove Account</button>
      </div>
    </mat-card>
    <div *ngIf="!user">Not logged in</div>
  `,
})
export class MeComponent {
  user: User | null = null;
  uform: FormGroup;
  eform: FormGroup;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.uform = this.fb.group({ username: [this.user?.username || ''] });
    this.eform = this.fb.group({ email: [this.user?.email || ''] });
  }

  changeUsername() {
    try {
      this.auth.changeUsername(this.user!.id, this.uform.value.username);
      this.user = this.auth.currentUser();
    } catch (e) {}
  }

  changeEmail() {
    try {
      this.auth.changeEmail(this.user!.id, this.eform.value.email);
      this.user = this.auth.currentUser();
    } catch (e: any) {
      alert(e.message || e);
    }
  }

  confirmRemove() {
    const ref = this.dialog.open(ConfirmModalComponent, {
      data: { title: 'Remove account', message: 'Are you sure?' },
    });
    ref.afterClosed().subscribe((ok: any) => {
      if (ok) {
        this.auth.removeAccount(this.user!.id);
        window.location.href = '/';
      }
    });
  }
}
