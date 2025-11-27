import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddProductModalComponent } from '../ui/add-product-modal.component';
import { ProductListComponent } from '../components/product-list.component';
import { CategoryFilterComponent } from '../components/category-filter.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-products',
  standalone: true,
  imports: [
    CommonModule,
    ProductListComponent,
    CategoryFilterComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  template: `
    <div style="display:flex;gap:8px;align-items:center">
      <category-filter (change)="onCategory($event)"></category-filter>
      <mat-form-field appearance="fill"
        ><mat-label>Product name</mat-label><input matInput [formControl]="q.controls.product"
      /></mat-form-field>
      <mat-form-field appearance="fill"
        ><mat-label>Date (YYYY-MM-DD)</mat-label><input matInput [formControl]="q.controls.date"
      /></mat-form-field>
      <button mat-stroked-button color="primary" (click)="openAdd()">+</button>
    </div>
    <product-list [products]="products" (delete)="remove($event)"></product-list>
  `,
})
export class MyProductsComponent implements OnInit {
  products: Product[] = [];
  category = '';
  user: any;
  q: any;
  constructor(
    private ps: ProductService,
    private auth: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.user = this.auth.currentUser();
    this.q = this.fb.group({ product: [''], date: [''] });
    this.q.valueChanges.subscribe(() => this.reload());
  }
  ngOnInit() {
    this.reload();
  }
  reload() {
    const username = this.user?.username || '';
    this.products = this.ps.filter({
      username,
      productName: this.q.value.product ?? undefined,
      date: this.q.value.date ?? undefined,
      categoryId: this.category || undefined,
    });
  }
  onCategory(id: string) {
    this.category = id;
    this.reload();
  }
  async openAdd() {
    const mod = await import('../ui/add-product-modal.component');
    const ref = this.dialog.open(mod.AddProductModalComponent);
    ref.afterClosed().subscribe((p: any) => {
      if (p) this.reload();
    });
  }
  remove(id: string) {
    this.ps.remove(id);
    this.reload();
  }
}
