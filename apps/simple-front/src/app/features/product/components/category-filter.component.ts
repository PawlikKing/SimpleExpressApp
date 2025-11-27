import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'category-filter',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Category</mat-label>
      <mat-select (selectionChange)="select($event.value)">
        <mat-option [value]="''">All</mat-option>
        <mat-option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class CategoryFilterComponent {
  @Output() change = new EventEmitter<string>();
  categories: Array<any> = [];
  constructor(private ps: ProductService) {
    this.categories = this.ps.categories();
  }
  select(v: any) {
    this.change.emit(v);
  }
}
