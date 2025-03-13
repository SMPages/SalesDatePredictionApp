import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  empid: number;
  requireddate: string;
  shippeddate: string;
  shipname: string;
  shipaddress: string;
  shipcity: string;
}
export interface CreateOrderRequest {
  empid: number;
  shipperid: number;
  shipname: string;
  shipaddress: string;
  shipcity: string;
  shipcountry: string;
  orderdate: string;
  requireddate: string;
  shippeddate: string;
  freight: number;
  productid: number;
  unitprice: number;
  qty: number;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:5281/api/orders'; // URL base de la API

  constructor(private http: HttpClient) {}

  getOrdersByCustomer(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  createOrder(order: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/create`, order);
  }
}
