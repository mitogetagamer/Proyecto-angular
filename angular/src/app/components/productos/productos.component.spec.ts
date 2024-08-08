import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosComponent } from './productos.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TiendaService } from '../../services/tienda.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProductosComponent', () => {
  let component: ProductosComponent;
  let fixture: ComponentFixture<ProductosComponent>;
  let tiendaServiceMock: any;
  let toastrServiceMock: any;

  beforeEach(async () => {
    tiendaServiceMock = jasmine.createSpyObj('TiendaService', [
      'getMapcakes',
      'deleteMapcakes',
      'crearMapcake',
      'editarMapcakes',
    ]);
    tiendaServiceMock.getMapcakes.and.returnValue(
      of({ resultado: 'bien', datos: [] })
    ); // Mock getMapcakes to return an observable
    tiendaServiceMock.deleteMapcakes.and.returnValue(of({ resultado: 'bien' }));

    toastrServiceMock = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ProductosComponent, // Import the standalone component
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: TiendaService, useValue: tiendaServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call deleteMapcakes and show success message on success', () => {
    component.handleDelete('testid');

    expect(tiendaServiceMock.deleteMapcakes).toHaveBeenCalledWith('testid');
    expect(toastrServiceMock.success).toHaveBeenCalledWith(
      'El mapcake fue eliminado con exito'
    );
  });
  // it('should call submit mapcakes', () => {
  //   component.handleSubmit();
  //   expect(tiendaServiceMock.handleSubmit).toHaveBeenCalledWith('id');
  //   expect(tiendaServiceMock.success).toHaveBeenCalledWith(
  //     'El mapcake fue creado con exito'
  //   );
  // });
});
