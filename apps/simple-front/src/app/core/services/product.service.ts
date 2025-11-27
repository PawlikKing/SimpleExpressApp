import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  username: string;
  productName: string;
  price: number;
  date: string;
  categoryId: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly key = 'budgetapp_products';

  private load(): Product[] {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  private save(items: Product[]) {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  listAll(): Product[] {
    return this.load().sort((a, b) => b.date.localeCompare(a.date));
  }

  listByUser(username: string) {
    return this.load()
      .filter((p) => p.username === username)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  filter(opts: { username?: string; date?: string; productName?: string; categoryId?: string }) {
    let items = this.load();
    if (opts.username)
      items = items.filter((i) => i.username.toLowerCase().includes(opts.username!.toLowerCase()));
    if (opts.date) items = items.filter((i) => i.date.startsWith(opts.date || ''));
    if (opts.productName)
      items = items.filter((i) =>
        i.productName.toLowerCase().includes(opts.productName!.toLowerCase()),
      );
    if (opts.categoryId) items = items.filter((i) => i.categoryId === opts.categoryId);
    return items;
  }

  add(product: Omit<Product, 'id' | 'date'> & { date?: string }) {
    const items = this.load();
    const p = {
      id: Date.now().toString(),
      date: product.date || new Date().toISOString(),
      username: product.username,
      productName: product.productName,
      price: product.price,
      categoryId: product.categoryId,
    } as Product;
    items.push(p);
    this.save(items);
    return p;
  }

  remove(id: string) {
    const items = this.load().filter((i) => i.id !== id);
    this.save(items);
  }

  categories() {
    return [
      { id: '1', name: 'Food' },
      { id: '2', name: 'Transport' },
      { id: '3', name: 'Utilities' },
      { id: '4', name: 'Entertainment' },
    ];
  }
}
