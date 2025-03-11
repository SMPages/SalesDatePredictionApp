import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="logo">SalesApp</a>
      <a routerLink="/customers">Customers</a>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      background: #000;
      padding: 1rem;
    }
    .navbar a {
      color: white;
      margin-right: 1rem;
      text-decoration: none;
      font-weight: bold;
    }
    .logo {
      font-size: 1.5rem;
    }
  `]
})
export class NavbarComponent {}
