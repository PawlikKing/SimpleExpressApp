import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
      <span style="cursor:pointer" (click)="router.navigateByUrl('/')">BudgetApp</span>
      <span style="flex:1 1 auto"></span>
      <button mat-icon-button aria-label="everyone" (click)="router.navigateByUrl('/everyone')">
        <mat-icon>public</mat-icon>
      </button>
      <button mat-icon-button aria-label="my" (click)="router.navigateByUrl('/my')">
        <mat-icon>person</mat-icon>
      </button>
      <button mat-button (click)="router.navigateByUrl('/login')">Login</button>
      <button mat-button (click)="router.navigateByUrl('/register')">Register</button>
    </mat-toolbar>
    <main style="padding:16px"><router-outlet></router-outlet></main>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('simple-front');
  constructor(public router: Router) {}
}
