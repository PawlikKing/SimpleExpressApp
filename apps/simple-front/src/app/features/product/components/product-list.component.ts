import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  template: `
    <table mat-table [dataSource]="products" class="mat-elevation-z1" style="width:100%">
      <ng-container matColumnDef="username">
        <th mat-header-cell *matHeaderCellDef>Username</th>
        <td mat-cell *matCellDef="let e">{{ e.username }}</td>
      </ng-container>
      <ng-container matColumnDef="productName">
        <th mat-header-cell *matHeaderCellDef>Product</th>
        <td mat-cell *matCellDef="let e">{{ e.productName }}</td>
      </ng-container>
      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef>Price</th>
        <td mat-cell *matCellDef="let e">{{ e.price | number: '1.2-2' }}</td>
      </ng-container>
      <ng-container matColumnDef="date">
        <th mat-header-cell *matHeaderCellDef>Date</th>
        <td mat-cell *matCellDef="let e">{{ e.date | date: 'short' }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let e">
          <button mat-button color="warn" (click)="delete.emit(e.id)">Delete</button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayed"></tr>
      <tr mat-row *matRowDef="let row; columns: displayed"></tr>
    </table>
  `,
})
export class ProductListComponent {
  @Input() products: Product[] = [];
  @Output() delete = new EventEmitter<string>();
  displayed = ['username', 'productName', 'price', 'date', 'actions'];
}
