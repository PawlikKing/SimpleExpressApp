import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'add-product-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
  ],
  template: `
    <h3>Add product</h3>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Product Name</mat-label>
        <input matInput formControlName="productName" />
      </mat-form-field>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Category</mat-label>
        <mat-select formControlName="categoryId">
          <mat-option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field appearance="fill" style="width:100%">
        <mat-label>Price</mat-label>
        <input matInput type="number" formControlName="price" />
      </mat-form-field>
      <div style="margin-top:8px">
        <button mat-raised-button color="primary" [disabled]="form.invalid">Add</button>
      </div>
    </form>
  `,
})
export class AddProductModalComponent {
  categories: any[] = [];
  form: FormGroup;
  constructor(
    public ref: MatDialogRef<AddProductModalComponent>,
    private fb: FormBuilder,
    private ps: ProductService,
    private auth: AuthService,
  ) {
    this.categories = this.ps.categories();
    this.form = this.fb.group({
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: [0, Validators.required],
    });
  }
  submit() {
    const user = this.auth.currentUser();
    const username = user?.username || 'anonymous';
    const p = this.ps.add({
      username,
      productName: this.form.value.productName || 'null',
      price: +(this.form.value.price || 0),
      categoryId: this.form.value.categoryId || 'null',
    });
    this.ref.close(p);
  }
}
