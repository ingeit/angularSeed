import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { StepsComponent } from './steps.component';

describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
