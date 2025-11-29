import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('add', () => {
    it('should add a new product', () => {
      const product = service.add({
        username: 'testuser',
        productName: 'Test Product',
        price: 100,
        categoryId: '1',
      });

      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.username).toBe('testuser');
      expect(product.productName).toBe('Test Product');
      expect(product.price).toBe(100);
      expect(product.categoryId).toBe('1');
      expect(product.date).toBeDefined();
    });

    it('should auto-generate date if not provided', () => {
      const product = service.add({
        username: 'testuser',
        productName: 'Test Product',
        price: 100,
        categoryId: '1',
      });

      expect(product.date).toBeDefined();
    });

    it('should use provided date if given', () => {
      const date = '2024-01-01T12:00:00Z';
      const product = service.add({
        username: 'testuser',
        productName: 'Test Product',
        price: 100,
        categoryId: '1',
        date,
      });

      expect(product.date).toBe(date);
    });
  });

  describe('listAll', () => {
    beforeEach(() => {
      service.add({
        username: 'user1',
        productName: 'Product 1',
        price: 10,
        categoryId: '1',
        date: '2024-01-01T12:00:00Z',
      });
      service.add({
        username: 'user2',
        productName: 'Product 2',
        price: 20,
        categoryId: '2',
        date: '2024-01-02T12:00:00Z',
      });
    });

    it('should return all products', () => {
      const products = service.listAll();

      expect(products.length).toBe(2);
    });

    it('should return products sorted by date in descending order', () => {
      const products = service.listAll();

      expect(products[0].productName).toBe('Product 2');
      expect(products[1].productName).toBe('Product 1');
    });
  });

  describe('listByUser', () => {
    beforeEach(() => {
      service.add({
        username: 'user1',
        productName: 'Product 1',
        price: 10,
        categoryId: '1',
      });
      service.add({
        username: 'user1',
        productName: 'Product 2',
        price: 20,
        categoryId: '2',
      });
      service.add({
        username: 'user2',
        productName: 'Product 3',
        price: 30,
        categoryId: '1',
      });
    });

    it('should return only products from specified user', () => {
      const products = service.listByUser('user1');

      expect(products.length).toBe(2);
      expect(products.every((p) => p.username === 'user1')).toBe(true);
    });

    it('should return empty array for user with no products', () => {
      const products = service.listByUser('nonexistent');

      expect(products.length).toBe(0);
    });
  });

  describe('filter', () => {
    beforeEach(() => {
      service.add({
        username: 'john',
        productName: 'Laptop',
        price: 1000,
        categoryId: '1',
        date: '2024-01-01T12:00:00Z',
      });
      service.add({
        username: 'jane',
        productName: 'Mouse',
        price: 50,
        categoryId: '1',
        date: '2024-01-02T12:00:00Z',
      });
      service.add({
        username: 'john',
        productName: 'Keyboard',
        price: 100,
        categoryId: '2',
        date: '2024-01-03T12:00:00Z',
      });
    });

    it('should filter by username', () => {
      const products = service.filter({ username: 'john' });

      expect(products.length).toBe(2);
      expect(products.every((p) => p.username === 'john')).toBe(true);
    });

    it('should filter by productName (case-insensitive)', () => {
      const products = service.filter({ productName: 'laptop' });

      expect(products.length).toBe(1);
      expect(products[0].productName).toBe('Laptop');
    });

    it('should filter by categoryId', () => {
      const products = service.filter({ categoryId: '1' });

      expect(products.length).toBe(2);
      expect(products.every((p) => p.categoryId === '1')).toBe(true);
    });

    it('should filter by date', () => {
      const products = service.filter({ date: '2024-01-02' });

      expect(products.length).toBe(1);
      expect(products[0].productName).toBe('Mouse');
    });

    it('should combine multiple filters', () => {
      const products = service.filter({
        username: 'john',
        categoryId: '2',
      });

      expect(products.length).toBe(1);
      expect(products[0].productName).toBe('Keyboard');
    });
  });

  describe('remove', () => {
    it('should remove product by id', () => {
      const product = service.add({
        username: 'testuser',
        productName: 'Test Product',
        price: 100,
        categoryId: '1',
      });

      service.remove(product.id);

      const products = service.listAll();
      expect(products.length).toBe(0);
    });
  });

  describe('categories', () => {
    it('should return list of categories', () => {
      const categories = service.categories();

      expect(categories.length).toBeGreaterThan(0);
      expect(categories[0].id).toBeDefined();
      expect(categories[0].name).toBeDefined();
    });

    it('should return specific categories', () => {
      const categories = service.categories();
      const categoryNames = categories.map((c) => c.name);

      expect(categoryNames).toContain('Food');
      expect(categoryNames).toContain('Transport');
      expect(categoryNames).toContain('Utilities');
      expect(categoryNames).toContain('Entertainment');
    });
  });
});
