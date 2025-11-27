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
    @if (loading()) {
      <div class="app-loader">
        <div class="loader-content">
          <div class="loader-text">For Lazy People from Lazy People</div>
          <div class="loader-bars">
            <div class="bar bar-blue"></div>
            <div class="bar bar-orange"></div>
            <div class="bar bar-yellow"></div>
          </div>
        </div>
      </div>
    }

    <mat-toolbar color="primary">
      <span style="cursor:pointer" (click)="router.navigateByUrl('/')">BudgetApp</span>
      <span style="flex:1 1 auto"></span>
      <button mat-icon-button (click)="router.navigateByUrl('/everyone')">
        <mat-icon>public</mat-icon>
      </button>
      <button mat-icon-button (click)="router.navigateByUrl('/my')">
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
        backdrop-filter: blur(4px);
      }

      .loader-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }

      .loader-bars {
        display: flex;
        gap: 10px;
        align-items: center;
      }

      .bar {
        width: 18px;
        height: 48px;
        border-radius: 4px;
        transform: rotate(25deg) scaleY(1);
        animation: pulse 1.2s ease-in-out 1;
      }

      .bar-blue {
        background: #1976d2;
        animation-delay: 0ms;
      }
      .bar-orange {
        background: #ff9800;
        animation-delay: 150ms;
      }
      .bar-yellow {
        background: #ffeb3b;
        animation-delay: 300ms;
        color: #000;
      }

      .loader-text {
        font-size: 24px;
        font-weight: 600;
        color: #1a4971;
      }

      @keyframes pulse {
        0% 100% {
          transform: rotate(25deg) scaleY(0.4);
        }
        50% {
          transform: rotate(25deg) scaleY(1);
        }
      }
    `,
  ],
})
export class App implements OnInit {
  protected readonly loading = signal(true);
  constructor(public router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading.set(false);
    }, 1300);
  }
}
