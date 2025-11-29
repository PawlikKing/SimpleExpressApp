import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { MeComponent } from './me.component';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let authService: AuthService;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: () => of(null) });

    await TestBed.configureTestingModule({
      imports: [MeComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [AuthService, { provide: MatDialog, useValue: dialogSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display message when user is not logged in', () => {
    fixture.detectChanges();

    const notLoggedInText = fixture.nativeElement.querySelector('div');
    expect(notLoggedInText.textContent).toContain('Not logged in');
  });

  it('should display user information when logged in', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    component.user = authService.currentUser();
    fixture.detectChanges();

    const username = fixture.nativeElement.querySelector('p');
    expect(username.textContent).toContain('testuser');
  });

  it('should change username successfully', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    component.user = authService.currentUser();

    component.uform.patchValue({ username: 'newusername' });
    component.changeUsername();

    expect(component.user?.username).toBe('newusername');
  });

  it('should change email successfully', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    component.user = authService.currentUser();

    component.eform.patchValue({ email: 'newemail@budgetapp' });
    component.changeEmail();

    expect(component.user?.email).toBe('newemail@budgetapp');
  });

  it('should not change email to invalid domain', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    component.user = authService.currentUser();
    const originalEmail = component.user?.email;

    component.eform.patchValue({ email: 'invalid@gmail.com' });
    component.changeEmail();

    expect(component.user?.email).toBe(originalEmail);
  });

  it('should open confirmation dialog when removing account', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    component.user = authService.currentUser();
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: () => of(false) });
    dialog.open.and.returnValue(dialogRefSpyObj);

    component.confirmRemove();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should initialize forms in constructor', () => {
    expect(component.uform).toBeDefined();
    expect(component.eform).toBeDefined();
    expect(component.uform.get('username')).toBeDefined();
    expect(component.eform.get('email')).toBeDefined();
  });
});
