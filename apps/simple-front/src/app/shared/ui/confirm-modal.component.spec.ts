import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { title: 'Test Title', message: 'Test message' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ConfirmModalComponent>>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title from data', () => {
    const title = fixture.nativeElement.querySelector('h2[mat-dialog-title]');
    expect(title.textContent).toContain('Test Title');
  });

  it('should display message from data', () => {
    const message = fixture.nativeElement.querySelector('[mat-dialog-content]');
    expect(message.textContent).toContain('Test message');
  });

  it('should display Cancel and Confirm buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Cancel');
    expect(buttons[1].textContent).toContain('Confirm');
  });

  it('should close dialog with false when Cancel is clicked', () => {
    const cancelButton = fixture.nativeElement.querySelector('button');
    cancelButton.click();

    expect(dialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should close dialog with true when Confirm is clicked', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const confirmButton = buttons[1];
    confirmButton.click();

    expect(dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should display default title when not provided', () => {
    const newDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ConfirmModalComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: newDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Test message' } },
      ],
    });

    const comp = TestBed.createComponent(ConfirmModalComponent);
    comp.detectChanges();

    const title = comp.nativeElement.querySelector('h2[mat-dialog-title]');
    expect(title.textContent).toContain('Confirm');
  });
});
