import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule],
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css'],
})
export class CustomerOrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'requiredDate', 'shippedDate', 'shipName', 'shipAddress', 'shipCity'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomersService,
    public dialogRef: MatDialogRef<CustomerOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public customer: any
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.customerService.getOrdersByCustomer(this.customer.id).subscribe((orders) => {
      this.dataSource.data = orders;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
