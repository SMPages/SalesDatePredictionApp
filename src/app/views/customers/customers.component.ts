import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CustomerOrdersComponent } from '../customer-orders/customer-orders.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  customers: any[] = []; 
  customers$: Observable<any[]> = new Observable();
  filter = '';
  page = 0;
  pageSize = 5;
  sortColumn = 'name';
  sortDirection = 1;

  constructor(private customersService: CustomersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customersService
      .getCustomers(this.filter, this.page, this.pageSize, this.sortColumn, this.sortDirection)
      .subscribe(data => {
        this.customers = [...data]; 
      });
  }
  search() {
    this.page = 0;
    this.loadCustomers();
  }

  changePage(direction: number) {
    this.page += direction;
    if (this.page < 0) this.page = 0;
    this.loadCustomers();
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection *= -1; // 🔄 Cambia de ascendente a descendente
    } else {
      this.sortColumn = column;
      this.sortDirection = 1; // 🔼 Predeterminado ascendente
    }
    this.sortTable();
  }

  sortTable() {
    this.customers.sort((a, b) => {
      if (a[this.sortColumn] > b[this.sortColumn]) return 1 * this.sortDirection;
      if (a[this.sortColumn] < b[this.sortColumn]) return -1 * this.sortDirection;
      return 0;
    });
  }

  viewOrders(customer: any) {
    this.dialog.open(CustomerOrdersComponent, {
      width: '800px',
      data: customer
    });
  }

  newOrder(customer: any) {
    alert(`Crear nueva orden para ${customer.name}`);
  }
}
