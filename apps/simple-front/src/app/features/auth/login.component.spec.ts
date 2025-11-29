import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();

    spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('identifier')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should have valid form when all fields are filled', () => {
    component.form.patchValue({
      identifier: 'testuser',
      password: 'password123',
    });

    expect(component.form.valid).toBe(true);
  });

  it('should login successfully with valid credentials', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    authService.clearSession();

    component.form.patchValue({
      identifier: 'testuser',
      password: 'password123',
    });
    component.submit();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/my');
    expect(component.error).toBe('');
  });

  it('should login successfully with email', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    authService.clearSession();

    component.form.patchValue({
      identifier: 'test@budgetapp',
      password: 'password123',
    });
    component.submit();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/my');
    expect(component.error).toBe('');
  });

  it('should show error with invalid credentials', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    authService.clearSession();

    component.form.patchValue({
      identifier: 'testuser',
      password: 'wrongPassword',
    });
    component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.error).toBe('Invalid credentials');
  });

  it('should show error with non-existent user', () => {
    component.form.patchValue({
      identifier: 'nonexistent',
      password: 'password123',
    });
    component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.error).toBe('Invalid credentials');
  });

  it('should display error message in template when error occurs', () => {
    component.error = 'Test error message';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('div[style*="color:tomato"]');
    expect(errorElement?.textContent).toContain('Test error message');
  });

  it('should navigate to password reset page', () => {
    const button = fixture.nativeElement.querySelector('button[type="button"]');
    button.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/send-reset');
  });
});
