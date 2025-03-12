import { Routes } from '@angular/router';
import { CustomersComponent } from './views/customers/customers.component';

export const routes: Routes = [
  { path: '', component: CustomersComponent , pathMatch: 'full'},
  { path: 'customers', component: CustomersComponent }
];