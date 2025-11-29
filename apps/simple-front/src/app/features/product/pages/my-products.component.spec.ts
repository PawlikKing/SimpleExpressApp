import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { MyProductsComponent } from './my-products.component';

describe('MyProductsComponent', () => {
  let component: MyProductsComponent;
  let fixture: ComponentFixture<MyProductsComponent>;
  let productService: ProductService;
  let authService: AuthService;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: () => of(null) });

    await TestBed.configureTestingModule({
      imports: [MyProductsComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [ProductService, AuthService, { provide: MatDialog, useValue: dialogSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MyProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
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

  it('should load current user on init', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');

    fixture.detectChanges();

    expect(component.user).toBeDefined();
    expect(component.user.username).toBe('testuser');
  });

  it('should load only current user products', () => {
    authService.signUp('john', 'john@budgetapp', 'password123');
    productService.add({
      username: 'john',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });

    authService.clearSession();
    authService.signUp('jane', 'jane@budgetapp', 'password123');
    authService.clearSession();
    authService.login('john@budgetapp', 'password123');

    fixture.detectChanges();

    expect(component.products.length).toBe(1);
    expect(component.products[0].username).toBe('john');
  });

  it('should filter products by product name', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    productService.add({
      username: 'testuser',
      productName: 'Laptop',
      price: 1000,
      categoryId: '1',
    });
    productService.add({
      username: 'testuser',
      productName: 'Mouse',
      price: 50,
      categoryId: '1',
    });

    component.q.patchValue({ product: 'laptop' });

    expect(component.products.length).toBe(1);
    expect(component.products[0].productName).toBe('Laptop');
  });

  it('should filter products by date', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    productService.add({
      username: 'testuser',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
      date: '2024-01-01T12:00:00Z',
    });
    productService.add({
      username: 'testuser',
      productName: 'Product 2',
      price: 200,
      categoryId: '2',
      date: '2024-01-02T12:00:00Z',
    });

    component.q.patchValue({ date: '2024-01-01' });

    expect(component.products.length).toBe(1);
  });

  it('should filter products by category', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    productService.add({
      username: 'testuser',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });
    productService.add({
      username: 'testuser',
      productName: 'Product 2',
      price: 200,
      categoryId: '2',
    });

    component.onCategory('1');

    expect(component.products.length).toBe(1);
    expect(component.products[0].categoryId).toBe('1');
  });

  it('should remove product by id', () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    const product = productService.add({
      username: 'testuser',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });

    component.remove(product.id);

    expect(component.products.length).toBe(0);
  });

  it('should open add product modal', async () => {
    authService.signUp('testuser', 'test@budgetapp', 'password123');
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: () => of(null) });
    dialog.open.and.returnValue(dialogRefSpyObj);

    await component.openAdd();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should combine multiple filters', () => {
    authService.signUp('john', 'john@budgetapp', 'password123');
    productService.add({
      username: 'john',
      productName: 'Laptop',
      price: 1000,
      categoryId: '1',
    });
    productService.add({
      username: 'john',
      productName: 'Mouse',
      price: 50,
      categoryId: '2',
    });

    component.q.patchValue({ product: 'laptop' });
    component.onCategory('1');

    expect(component.products.length).toBe(1);
    expect(component.products[0].productName).toBe('Laptop');
    expect(component.products[0].categoryId).toBe('1');
  });
});
