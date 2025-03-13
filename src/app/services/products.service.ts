import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5281/api/products'; // Ajusta la URL según tu backend

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
