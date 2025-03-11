// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class CustomersService {
//   private customers$ = new BehaviorSubject<any[]>([]);

//   constructor(private http: HttpClient) {}

//   getCustomers(filter: string, page: number, pageSize: number, sort: string): Observable<any[]> {
//     return this.http.get<any[]>('https://api.example.com/customers', {
//       params: { filter, page, pageSize, sort },
//     }).pipe(
//       map((response) => {
//         this.customers$.next(response);
//         return response;
//       })
//     );
//   }

//   getCustomersStream(): Observable<any[]> {
//     return this.customers$.asObservable();
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private customers$ = new BehaviorSubject<any[]>([]);

  constructor() {
    // Simulación de datos al inicializar el servicio
    this.loadMockData();
  }

  private loadMockData() {
    const mockCustomers = [
      { name: 'Customer AHPOP', lastOrderDate: 'ahpop@example.com', nextPredictedOrder: '123-456-7890' },
      { name: 'Customer AHXHT', lastOrderDate: 'ahxht@example.com', nextPredictedOrder: '987-654-3210' },
      { name: 'Customer AZJED', lastOrderDate: 'azjed@example.com', nextPredictedOrder: '456-123-7890' },
      { name: 'Customer BSYAR', lastOrderDate: 'bsyar@example.com', nextPredictedOrder: '321-987-6540' },
      { name: 'Customer CCFIZ', lastOrderDate: 'ccfiz@example.com', nextPredictedOrder: '789-654-1230' },
    ];
    this.customers$.next(mockCustomers);
  }

  getCustomers(filter: string, page: number, pageSize: number, sortColumn: string,  sortDirection: number): Observable<any[]> {
    return this.customers$.asObservable();
  }

  getCustomersStream(): Observable<any[]> {
    return this.customers$.asObservable();
  }
}
