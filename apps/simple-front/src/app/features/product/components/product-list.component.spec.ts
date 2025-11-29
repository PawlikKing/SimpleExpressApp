import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Product } from '../../../core/services/product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty table when no products provided', () => {
    component.products = [];
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr[mat-row]');
    expect(rows.length).toBe(0);
  });

  it('should display products in table', () => {
    const products: Product[] = [
      {
        id: '1',
        username: 'user1',
        productName: 'Product 1',
        price: 100,
        date: '2024-01-01T00:00:00Z',
        categoryId: '1',
      },
      {
        id: '2',
        username: 'user2',
        productName: 'Product 2',
        price: 200,
        date: '2024-01-02T00:00:00Z',
        categoryId: '2',
      },
    ];

    component.products = products;
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr[mat-row]');
    expect(rows.length).toBe(2);
  });

  it('should display product details in correct columns', () => {
    const products: Product[] = [
      {
        id: '1',
        username: 'testuser',
        productName: 'Test Product',
        price: 99.99,
        date: '2024-01-01T00:00:00Z',
        categoryId: '1',
      },
    ];

    component.products = products;
    fixture.detectChanges();

    const cells = fixture.nativeElement.querySelectorAll('td[mat-cell]');
    expect(cells[0].textContent).toContain('testuser');
    expect(cells[1].textContent).toContain('Test Product');
    expect(cells[2].textContent).toContain('99.99');
  });

  it('should emit delete event when delete button clicked', () => {
    spyOn(component.delete, 'emit');

    const products: Product[] = [
      {
        id: 'product-1',
        username: 'user1',
        productName: 'Product 1',
        price: 100,
        date: '2024-01-01T00:00:00Z',
        categoryId: '1',
      },
    ];

    component.products = products;
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
    deleteButton.click();

    expect(component.delete.emit).toHaveBeenCalledWith('product-1');
  });

  it('should display correct number of columns', () => {
    expect(component.displayed.length).toBe(5);
    expect(component.displayed).toContain('username');
    expect(component.displayed).toContain('productName');
    expect(component.displayed).toContain('price');
    expect(component.displayed).toContain('date');
    expect(component.displayed).toContain('actions');
  });
});
