import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoModalComponent } from './establecimiento-modal.component';

describe('EstablecimientoModalComponent', () => {
  let component: EstablecimientoModalComponent;
  let fixture: ComponentFixture<EstablecimientoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablecimientoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
