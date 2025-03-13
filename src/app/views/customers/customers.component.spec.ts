import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomersComponent } from './customers.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersService } from '../../services/customers.service';
import { of } from 'rxjs';

describe('CustomersComponent', () => {
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let mockCustomerService: jasmine.SpyObj<CustomersService>;

  beforeEach(async () => {
    mockCustomerService = jasmine.createSpyObj('CustomersService', ['getCustomers']);
    mockCustomerService.getCustomers.and.returnValue(of([])); // Simula una respuesta vacía

    await TestBed.configureTestingModule({
      imports: [CustomersComponent, HttpClientModule], // ✅ Agregamos HttpClientModule
      providers: [{ provide: CustomersService, useValue: mockCustomerService }] // ✅ Inyectamos el mock del servicio
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
