import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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
    expect(component.form.get('username')?.value).toBe('');
    expect(component.form.get('email')?.value).toBe('');
    expect(component.form.get('password')?.value).toBe('');
    expect(component.form.get('repeat')?.value).toBe('');
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should have valid form when all fields are filled correctly', () => {
    component.form.patchValue({
      username: 'testuser',
      email: 'test@budgetapp',
      password: 'password123',
      repeat: 'password123',
    });

    expect(component.form.valid).toBe(true);
  });

  it('should register successfully with valid data', () => {
    component.form.patchValue({
      username: 'testuser',
      email: 'test@budgetapp',
      password: 'password123',
      repeat: 'password123',
    });
    component.submit();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/my');
    expect(component.error).toBe('');
    expect(authService.isAuthenticated()).toBe(true);
  });

  it('should show error when passwords do not match', () => {
    component.form.patchValue({
      username: 'testuser',
      email: 'test@budgetapp',
      password: 'password123',
      repeat: 'differentPassword',
    });
    component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.error).toBe('Passwords do not match');
  });

  it('should show error with invalid email domain', () => {
    component.form.patchValue({
      username: 'testuser',
      email: 'test@gmail.com',
      password: 'password123',
      repeat: 'password123',
    });
    component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.error).toBe('Email must be in @budgetapp domain');
  });

  it('should show error when user already exists', () => {
    authService.signUp('existinguser', 'existing@budgetapp', 'password123');
    authService.clearSession();

    component.form.patchValue({
      username: 'existinguser',
      email: 'newemail@budgetapp',
      password: 'password123',
      repeat: 'password123',
    });
    component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.error).toBe('User already exists');
  });

  it('should show error when email is already registered', () => {
    authService.signUp('existinguser', 'existing@budgetapp', 'password123');
    authService.clearSession();

    component.form.patchValue({
      username: 'newuser',
      email: 'existing@budgetapp',
      password: 'password123',
      repeat: 'password123',
    });
    component.submit();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(component.error).toBe('User already exists');
  });

  it('should display error message in template', () => {
    component.error = 'Test error message';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('div[style*="color:tomato"]');
    expect(errorElement?.textContent).toContain('Test error message');
  });
});
