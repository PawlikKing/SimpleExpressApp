import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-send-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Send password reset</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" />
      </mat-form-field>
      <div style="margin-top:8px">
        <button mat-raised-button color="primary" [disabled]="form.invalid">Send reset link</button>
      </div>
      <div *ngIf="token" style="margin-top:8px">
        Reset token (simulate link): <code>{{ token }}</code>
      </div>
      <div *ngIf="error" style="color:tomato;margin-top:8px">{{ error }}</div>
    </form>
  `,
})
export class SendResetComponent {
  error = '';
  token = '';
  form: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  }
  submit() {
    try {
      const email = String(this.form.get('email')?.value || '');
      this.token = this.auth.sendReset(email);
    } catch (e: any) {
      this.error = e.message || e;
    }
  }
}
