import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <div class="app-loader" [hidden]="!loading()">
      <div class="loader-content">
        <div class="loader-bars">
          <div class="bar bar-blue"></div>
          <div class="bar bar-orange"></div>
          <div class="bar bar-yellow"></div>
        </div>
        <div class="loader-text">For Lazy People from Lazy People</div>
      </div>
    </div>

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
  styles: [
    `
      .app-loader {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(250, 250, 250, 0.95));
        z-index: 9999;
      }
      .loader-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
      .loader-bars {
        display: flex;
        gap: 14px;
        align-items: center;
        height: 60px;
      }
      .bar {
        width: 18px;
        height: 36px;
        border-radius: 4px;
        transform: rotate(25deg);
        transform-origin: center;
      }
      .bar-blue {
        background: #1976d2;
        animation: pulse 900ms ease-in-out infinite;
      }
      .bar-orange {
        background: #ff9800;
        animation: pulse 900ms ease-in-out infinite 120ms;
      }
      .bar-yellow {
        background: #ffeb3b;
        animation: pulse 900ms ease-in-out infinite 240ms;
      }
      .loader-text {
        font-weight: 600;
        color: #222;
        letter-spacing: 0.2px;
      }

      @keyframes pulse {
        0% {
          width: 18px;
        }
        25% {
          width: 34px;
        }
        50% {
          width: 46px;
        }
        75% {
          width: 34px;
        }
        100% {
          width: 18px;
        }
      }
    `,
  ],
})
export class App implements OnInit {
  protected readonly title = signal('simple-front');
  protected readonly loading = signal(true);
  constructor(public router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 900);
  }
}
