import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5281/api/employees'; 

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
}
