import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Reset password</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div *ngIf="!token">No token provided in query string</div>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>New password</mat-label>
        <input matInput type="password" formControlName="password" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Repeat password</mat-label>
        <input matInput type="password" formControlName="repeat" />
      </mat-form-field>
      <div style="margin-top:8px">
        <button mat-raised-button color="primary" [disabled]="form.invalid || !token">Reset</button>
      </div>
      <div *ngIf="message" style="color:green;margin-top:8px">{{ message }}</div>
      <div *ngIf="error" style="color:tomato;margin-top:8px">{{ error }}</div>
    </form>
  `,
})
export class ResetPasswordComponent {
  token = '';
  message = '';
  error = '';
  form: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    this.form = this.fb.group({
      password: ['', Validators.required],
      repeat: ['', Validators.required],
    });
  }
  submit() {
    if (String(this.form.get('password')?.value) !== String(this.form.get('repeat')?.value)) {
      this.error = 'Passwords do not match';
      return;
    }
    try {
      const newPass = String(this.form.get('password')?.value || '');
      this.auth.resetPassword(this.token, newPass);
      this.message = 'Password reset successful';
      setTimeout(() => this.router.navigateByUrl('/login'), 1200);
    } catch (e: any) {
      this.error = e.message || e;
    }
  }
}
