import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../core/services/auth.service';
import { SendResetComponent } from './send-reset.component';

describe('SendResetComponent', () => {
  let component: SendResetComponent;
  let fixture: ComponentFixture<SendResetComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendResetComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(SendResetComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    localStorage.clear();
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty email', () => {
    expect(component.form.get('email')?.value).toBe('');
  });

  it('should have invalid form when email is empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should have valid form when email is provided', () => {
    component.form.patchValue({
      email: 'test@budgetapp',
    });

    expect(component.form.valid).toBe(true);
  });

  it('should generate reset token for existing user', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');

    component.form.patchValue({
      email: 'test@budgetapp',
    });
    component.submit();

    expect(component.token).toBeDefined();
    expect(component.token.length).toBeGreaterThan(0);
    expect(component.error).toBe('');
  });

  it('should show error for non-existent email', () => {
    component.form.patchValue({
      email: 'nonexistent@budgetapp',
    });
    component.submit();

    expect(component.error).toBe('Email not found');
    expect(component.token).toBe('');
  });

  it('should display reset token in template', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');

    component.form.patchValue({
      email: 'test@budgetapp',
    });
    component.submit();
    fixture.detectChanges();

    const tokenElement = fixture.nativeElement.querySelector('code');
    expect(tokenElement?.textContent).toBe(component.token);
  });

  it('should display error message in template', () => {
    component.error = 'Test error message';
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('div[style*="color:tomato"]');
    expect(errorElement?.textContent).toContain('Test error message');
  });
});
