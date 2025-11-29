import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: AuthService;
  let router: Router;
  let resetToken: string;

  beforeEach(async () => {
    const mockActivatedRoute = {
      snapshot: {
        queryParamMap: {
          get: (key: string) => (key === 'token' ? resetToken : null),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [AuthService, { provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();

    // Create a user and generate reset token
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    authService.clearSession();
    resetToken = authService.sendReset('test@budgetapp');

    spyOn(router, 'navigateByUrl');

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load token from query parameters', () => {
    expect(component.token).toBe(resetToken);
  });

  it('should initialize form with empty passwords', () => {
    expect(component.form.get('password')?.value).toBe('');
    expect(component.form.get('repeat')?.value).toBe('');
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should have valid form when passwords match', () => {
    component.form.patchValue({
      password: 'newPassword123',
      repeat: 'newPassword123',
    });

    expect(component.form.valid).toBe(true);
  });

  it('should reset password successfully with valid token', (done) => {
    component.form.patchValue({
      password: 'newPassword123',
      repeat: 'newPassword123',
    });
    component.submit();

    setTimeout(() => {
      expect(component.message).toBe('Password reset successful');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
      done();
    }, 1300);
  });

  it('should not reset password when passwords do not match', () => {
    component.form.patchValue({
      password: 'newPassword123',
      repeat: 'differentPassword',
    });
    component.submit();

    expect(component.error).toBe('Passwords do not match');
    expect(component.message).toBe('');
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should show error with invalid token', () => {
    component.token = 'invalidToken';

    component.form.patchValue({
      password: 'newPassword123',
      repeat: 'newPassword123',
    });
    component.submit();

    expect(component.error).toBe('Invalid token');
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should display error message in template', () => {
    component.error = 'Test error message';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('div[style*="color:tomato"]');
    expect(errorElement?.textContent).toContain('Test error message');
  });

  it('should display success message in template', () => {
    component.message = 'Password reset successful';
    fixture.detectChanges();

    const messageElement = fixture.nativeElement.querySelector('div[style*="color:green"]');
    expect(messageElement?.textContent).toContain('Password reset successful');
  });

  it('should disable submit button when no token provided', () => {
    component.token = '';
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(button.disabled).toBe(true);
  });
});
