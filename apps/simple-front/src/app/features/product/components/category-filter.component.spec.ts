import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../../../core/services/product.service';
import { CategoryFilterComponent } from './category-filter.component';

describe('CategoryFilterComponent', () => {
  let component: CategoryFilterComponent;
  let fixture: ComponentFixture<CategoryFilterComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryFilterComponent, NoopAnimationsModule],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryFilterComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories from ProductService', () => {
    expect(component.categories.length).toBeGreaterThan(0);
  });

  it('should display categories in select options', () => {
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('mat-option');
    // +1 for "All" option
    expect(options.length).toBe(component.categories.length + 1);
  });

  it('should display "All" as default option', () => {
    fixture.detectChanges();

    const firstOption = fixture.nativeElement.querySelector('mat-option');
    expect(firstOption.textContent).toContain('All');
  });

  it('should emit change event when category is selected', () => {
    spyOn(component.change, 'emit');

    component.select('1');

    expect(component.change.emit).toHaveBeenCalledWith('1');
  });

  it('should emit empty string when All is selected', () => {
    spyOn(component.change, 'emit');

    component.select('');

    expect(component.change.emit).toHaveBeenCalledWith('');
  });

  it('should display category names', () => {
    fixture.detectChanges();

    const categoryNames = Array.from(fixture.nativeElement.querySelectorAll('mat-option')).map(
      (el: any) => el.textContent,
    );

    expect(categoryNames).toContain('All');
    expect(categoryNames).toContain('Food');
    expect(categoryNames).toContain('Transport');
  });
});
