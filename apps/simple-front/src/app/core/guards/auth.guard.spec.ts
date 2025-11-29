import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, AuthService],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();

    spyOn(router, 'navigateByUrl');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should allow access when user is authenticated', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to login when user is not authenticated', () => {
    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
