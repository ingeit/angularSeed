import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoListaComponent } from './establecimiento-lista.component';

describe('EstablecimientoListaComponent', () => {
  let component: EstablecimientoListaComponent;
  let fixture: ComponentFixture<EstablecimientoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablecimientoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
