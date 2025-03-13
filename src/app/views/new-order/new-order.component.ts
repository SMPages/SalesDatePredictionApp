import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders.service';
import { EmployeesService } from '../../services/employees.service';
import { ProductsService } from '../../services/products.service';
import { ShippersService } from '../../services/shippers.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

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
  providers: [MatNativeDateModule],
})
export class NewOrderComponent implements OnInit {
  @Input() employees: any[] = [];
  @Input() shippers: any[] = [];
  @Input() products: any[] = [];

  orderForm!: FormGroup;
  customerName: string = '';
  customerId: number = 0;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrderComponent>,
    private ordersService: OrdersService,
    private employeesService: EmployeesService,
    private productsService: ProductsService,
    private shippersService: ShippersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.customerName = this.data?.customerName || 'Unknown';
    this.customerId = this.data?.customerId || 0;

    this.orderForm = this.fb.group({
      empid: ['', Validators.required],
      shipperid: ['', Validators.required],
      shipname: ['', Validators.required],
      shipaddress: ['', Validators.required],
      shipcity: ['', Validators.required],
      shipcountry: ['', Validators.required],
      orderdate: ['', Validators.required],
      requireddate: ['', Validators.required],
      shippeddate: ['', Validators.required],
      freight: ['', [Validators.required, Validators.min(0)]],
      productid: ['', Validators.required],
      unitprice: ['', [Validators.required, Validators.min(0)]],
      qty: ['', [Validators.required, Validators.min(1)]],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.loadData();
  }

  private loadData(): void {
    this.employeesService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        console.log('Empleados cargados:', employees);
      },
      error: (err) => console.error('Error cargando empleados', err)
    });

    this.shippersService.getShippers().subscribe({
      next: (shippers) => {
        this.shippers = shippers;
        console.log('Transportistas cargados:', shippers);
      },
      error: (err) => console.error('Error cargando transportistas', err)
    });

    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('Productos cargados:', products);
      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  saveOrder() {
    if (this.orderForm.valid) {
      const orderData = {
        ...this.orderForm.value,
        customerId: this.customerId  // Agregamos el ID del cliente
      };

      this.ordersService.createOrder(orderData).subscribe(() => {
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
