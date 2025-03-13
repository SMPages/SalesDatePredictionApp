//Configuración y manejo del entorno de pruebas.
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { OrdersComponent } from './orders.component';
//Permite probar servicios HTTP sin hacer llamadas reales.
import { HttpClientTestingModule } from '@angular/common/http/testing';
//Servicio
import { OrdersService } from '../../services/orders.service';
import { of } from 'rxjs';
// Dependencias de Angular Material para la tabla.
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
//Modelo
import { Order } from '../../models/order.model';

// Mock de datos para la prueba
const mockOrders: Order[] = [
  { empid: 1, requireddate: '2025-03-10', shippeddate: '2025-03-12', shipname: 'Cliente A', shipaddress: 'Calle 123', shipcity: 'Bogotá' },
  { empid: 2, requireddate: '2025-03-11', shippeddate: '2025-03-13', shipname: 'Cliente B', shipaddress: 'Carrera 456', shipcity: 'Medellín' }
];

// Mock del servicio OrdersService
const mockOrdersService = {
  getOrdersByCustomer: jasmine.createSpy('getOrdersByCustomer').and.returnValue(of(mockOrders))
};

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        // Importamos el componente
        OrdersComponent,
        // Simula peticiones HTTP
        HttpClientTestingModule,
        // Para manejar modales en pruebas
        MatDialogModule,
        // Para paginación
        MatPaginatorModule,
        // Para ordenamiento
        MatSortModule
      ],
      providers: [
        { provide: OrdersService, useValue: mockOrdersService },
        // Datos pasados por modal
        { provide: MAT_DIALOG_DATA, useValue: { customerId: 1, customerName: 'Cliente A' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //Creación correctamente
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  //llenado correctamente
  it('should load orders into dataSource', () => {
    expect(component.dataSource.data.length).toBe(mockOrders.length);
    expect(component.dataSource.data).toEqual(mockOrders);
  });
});
