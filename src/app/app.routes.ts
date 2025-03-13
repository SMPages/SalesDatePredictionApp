import { Routes } from '@angular/router';
import { CustomersComponent } from './views/customers/customers.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

export const routes: Routes = [
  { path: '', component: CustomersComponent , pathMatch: 'full'},
  { path: 'customers', component: CustomersComponent },
  { path: 'bar-chart', component: BarChartComponent }
];