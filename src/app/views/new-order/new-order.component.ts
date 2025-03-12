import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrderComponent>,
    private ordersService: OrdersService
  ) {
    this.orderForm = this.fb.group({
      employee: ['', Validators.required],
      shipper: ['', Validators.required],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipCountry: ['', Validators.required],
      orderDate: ['', Validators.required],
      requiredDate: ['', Validators.required],
      shippedDate: ['', Validators.required],
      freight: ['', [Validators.required, Validators.min(0)]],
      product: ['', Validators.required],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      discount: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
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
}
