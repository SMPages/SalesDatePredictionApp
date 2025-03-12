import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Customer {
  id: number;
  name: string;
  lastOrderDate: string;
  nextPredictedOrder: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5153/api/customers'; // Reemplaza con tu API real

  getCustomers(filter: string = ''): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}?search=${filter}`);
  }
}
