import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-new-order',
  standalone: true,
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,  
  ],
  providers: [
    MatNativeDateModule 
  ],
})
export class NewOrderComponent implements OnInit {
  @Input() employees: any[] = [];
  @Input() shippers: any[] = [];
  @Input() products: any[] = [];

  orderForm!: FormGroup;
  customerName: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrderComponent>,
    private ordersService: OrdersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.customerName = this.data?.name || 'Unknown';

    this.orderForm = this.fb.group({
      employeeId: ['', Validators.required],
      shipperId: ['', Validators.required],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipCountry: ['', Validators.required],
      orderDate: ['', Validators.required],
      requiredDate: ['', Validators.required],
      shippedDate: ['', [Validators.required]],
      freight: ['', [Validators.required, Validators.min(0)]],
      productId: ['', Validators.required],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.loadData();
  }
  private loadData(): void {
    forkJoin({
      employees: this.ordersService.getEmployees(),
      shippers: this.ordersService.getShippers(),
      products: this.ordersService.getProducts()
    }).subscribe({
      next: (result) => {
        this.employees = result.employees;
        this.shippers = result.shippers;
        this.products = result.products;
      },
      error: (err) => console.error('Error loading data', err)
    });
  }

  saveOrder() {
    if (this.orderForm.valid) {
      this.ordersService.createOrder(this.orderForm.value).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  blockTextInput(event: KeyboardEvent) {
    event.preventDefault();
  }
}
