import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Shipper {
  shipperId: number;
  companyName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ShippersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5281/api/shippers'; // Ajusta la URL según tu backend

  getShippers(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(this.apiUrl);
  }
}