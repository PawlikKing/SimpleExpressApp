import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2>Register</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Username</mat-label>
        <input matInput formControlName="username" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Repeat Password</mat-label>
        <input matInput type="password" formControlName="repeat" />
      </mat-form-field>
      <div style="margin-top:8px">
        <button mat-raised-button color="primary" [disabled]="form.invalid">Create account</button>
      </div>
      <div *ngIf="error" style="color:tomato;margin-top:8px">{{ error }}</div>
    </form>
  `,
})
export class RegisterComponent {
  error = '';
  form: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      const username = String(this.form.get('username')?.value || '');
      const email = String(this.form.get('email')?.value || '');
      const password = String(this.form.get('password')?.value || '');
      this.auth.signUp(username, email, password);
      this.router.navigateByUrl('/my');
    } catch (e: any) {
      this.error = e.message || e;
    }
  }
}
