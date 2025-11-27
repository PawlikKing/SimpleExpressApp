import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Login</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Username or Email</mat-label>
        <input matInput formControlName="identifier" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
      </mat-form-field>
      <div style="margin-top:8px">
        <button mat-raised-button color="primary" [disabled]="form.invalid">Login</button>
        <button mat-button type="button" (click)="router.navigateByUrl('/send-reset')">
          Forgot?
        </button>
      </div>
      <div *ngIf="error" style="color:tomato;margin-top:8px">{{ error }}</div>
    </form>
  `,
})
export class LoginComponent {
  error = '';
  form: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public router: Router,
  ) {
    this.form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  submit() {
    try {
      const identifier = String(this.form.get('identifier')?.value || '');
      const password = String(this.form.get('password')?.value || '');
      this.auth.login(identifier, password);
      this.router.navigateByUrl('/my');
    } catch (e: any) {
      this.error = e.message || e;
    }
  }
}
