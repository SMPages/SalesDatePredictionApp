import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { CustomersService } from '../../services/customers.service';
import { OrdersComponent } from '../../views/orders/orders.component';
import { NewOrderComponent } from '../../views/new-order/new-order.component';

export interface Customer {
  name: string;
  lastOrderDate: string;
  nextPredictedOrder: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastOrderDate', 'nextPredictedOrder', 'actions'];
  dataSource = new MatTableDataSource<Customer>(); // ✅ Ahora MatTableDataSource está importado correctamente

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ✅ Ahora MatPaginator está importado correctamente
  @ViewChild(MatSort) sort!: MatSort; // ✅ Ahora MatSort está importado correctamente

  constructor(private customerService: CustomersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.dataSource.data = customers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openOrders(customer: Customer) {
    this.dialog.open(OrdersComponent, { 
      data: customer,
      panelClass: 'custom-orders-modal'
    });
    console.log(customer);
  }

  openNewOrder(customer: Customer) {
    this.dialog.open(NewOrderComponent, 
      {
         data: customer,
         panelClass: 'custom-new-orders-modal'
      });
  }
}