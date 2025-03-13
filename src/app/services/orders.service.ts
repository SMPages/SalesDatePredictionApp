import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, CreateOrderRequest } from '../models/order.model';

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
