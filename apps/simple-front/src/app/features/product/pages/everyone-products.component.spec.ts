import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { EveryoneProductsComponent } from './everyone-products.component';

describe('EveryoneProductsComponent', () => {
  let component: EveryoneProductsComponent;
  let fixture: ComponentFixture<EveryoneProductsComponent>;
  let productService: ProductService;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: () => of(null) });

    await TestBed.configureTestingModule({
      imports: [EveryoneProductsComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [ProductService, { provide: MatDialog, useValue: dialogSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(EveryoneProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all products on init', () => {
    const product = productService.add({
      username: 'user1',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });

    fixture.detectChanges();

    expect(component.products.length).toBe(1);
    expect(component.products[0].id).toBe(product.id);
  });

  it('should filter products by username', () => {
    productService.add({
      username: 'john',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });
    productService.add({
      username: 'jane',
      productName: 'Product 2',
      price: 200,
      categoryId: '2',
    });

    component.q.patchValue({ username: 'john' });

    expect(component.products.length).toBe(1);
    expect(component.products[0].username).toBe('john');
  });

  it('should filter products by product name', () => {
    productService.add({
      username: 'user1',
      productName: 'Laptop',
      price: 1000,
      categoryId: '1',
    });
    productService.add({
      username: 'user1',
      productName: 'Mouse',
      price: 50,
      categoryId: '1',
    });

    component.q.patchValue({ product: 'laptop' });

    expect(component.products.length).toBe(1);
    expect(component.products[0].productName).toBe('Laptop');
  });

  it('should filter products by date', () => {
    productService.add({
      username: 'user1',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
      date: '2024-01-01T12:00:00Z',
    });
    productService.add({
      username: 'user1',
      productName: 'Product 2',
      price: 200,
      categoryId: '2',
      date: '2024-01-02T12:00:00Z',
    });

    component.q.patchValue({ date: '2024-01-01' });

    expect(component.products.length).toBe(1);
  });

  it('should filter products by category', () => {
    productService.add({
      username: 'user1',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });
    productService.add({
      username: 'user1',
      productName: 'Product 2',
      price: 200,
      categoryId: '2',
    });

    component.onCategory('1');

    expect(component.products.length).toBe(1);
    expect(component.products[0].categoryId).toBe('1');
  });

  it('should remove product by id', () => {
    const product = productService.add({
      username: 'user1',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });

    component.remove(product.id);

    expect(component.products.length).toBe(0);
  });

  it('should reload products after removal', () => {
    const product = productService.add({
      username: 'user1',
      productName: 'Product 1',
      price: 100,
      categoryId: '1',
    });

    component.remove(product.id);

    const allProducts = productService.listAll();
    expect(allProducts.length).toBe(0);
  });

  it('should open add product modal', async () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: () => of(null) });
    dialog.open.and.returnValue(dialogRefSpyObj);

    await component.openAdd();

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should combine multiple filters', () => {
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
    productService.add({
      username: 'jane',
      productName: 'Laptop',
      price: 1200,
      categoryId: '1',
    });

    component.q.patchValue({ username: 'john', product: 'Laptop' });

    expect(component.products.length).toBe(1);
    expect(component.products[0].username).toBe('john');
    expect(component.products[0].productName).toBe('Laptop');
  });
});
