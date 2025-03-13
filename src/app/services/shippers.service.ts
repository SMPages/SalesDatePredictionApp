import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shipper } from '../models/shipper.model';

@Injectable({
  providedIn: 'root',
})
export class ShippersService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5281/api/shippers';

  getShippers(): Observable<Shipper[]> {
    return this.http.get<Shipper[]>(this.apiUrl);
  }
}