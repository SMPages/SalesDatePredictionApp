import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  orderId: number;
  requiredDate: string;
  shippedDate: string;
  shipName: string;
  shipAddress: string;
  shipCity: string;
}
export interface CreateOrderRequest {
  employee: string;
  shipper: string;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipCountry: string;
  orderDate: string;
  requiredDate: string;
  shippedDate: string;
  freight: number;
  product: string;
  unitPrice: number;
  quantity: number;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:5153/api/orders'; // URL base de la API

  constructor(private http: HttpClient) {}

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/customer/${customerId}`);
  }
  createOrder(order: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
