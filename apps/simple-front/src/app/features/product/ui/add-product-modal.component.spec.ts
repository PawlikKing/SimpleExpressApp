import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { AddProductModalComponent } from './add-product-modal.component';

describe('AddProductModalComponent', () => {
  let component: AddProductModalComponent;
  let fixture: ComponentFixture<AddProductModalComponent>;
  let productService: ProductService;
  let authService: AuthService;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AddProductModalComponent>>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [AddProductModalComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [ProductService, AuthService, { provide: MatDialogRef, useValue: dialogRefSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductModalComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    authService = TestBed.inject(AuthService);
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<AddProductModalComponent>
    >;
    localStorage.clear();
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories', () => {
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should initialize form with empty values', () => {
    expect(component.form.get('productName')?.value).toBe('');
    expect(component.form.get('categoryId')?.value).toBe('');
    expect(component.form.get('price')?.value).toBe(0);
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should have valid form when all fields are filled', () => {
    component.form.patchValue({
      productName: 'Test Product',
      categoryId: '1',
      price: 100,
    });

    expect(component.form.valid).toBe(true);
  });

  it('should add product and close dialog on submit', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');

    component.form.patchValue({
      productName: 'Test Product',
      categoryId: '1',
      price: 99.99,
    });

    component.submit();

    expect(dialogRef.close).toHaveBeenCalled();
    const addedProduct = dialogRef.close.calls.mostRecent().args[0];
    expect(addedProduct.productName).toBe('Test Product');
    expect(addedProduct.price).toBe(99.99);
  });

  it('should use logged in user username for product', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');

    component.form.patchValue({
      productName: 'Test Product',
      categoryId: '1',
      price: 50,
    });

    component.submit();

    const product = dialogRef.close.calls.mostRecent().args[0];
    expect(product.username).toBe('testuser');
  });

  it('should use anonymous when no user is logged in', () => {
    component.form.patchValue({
      productName: 'Test Product',
      categoryId: '1',
      price: 50,
    });

    component.submit();

    const product = dialogRef.close.calls.mostRecent().args[0];
    expect(product.username).toBe('anonymous');
  });

  it('should display categories in select dropdown', () => {
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('mat-option');
    expect(options.length).toBe(component.categories.length);
  });

  it('should have disabled submit button when form is invalid', () => {
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(button.disabled).toBe(true);
  });

  it('should have enabled submit button when form is valid', () => {
    component.form.patchValue({
      productName: 'Test Product',
      categoryId: '1',
      price: 100,
    });

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button[color="primary"]');
    expect(button.disabled).toBe(false);
  });
});
