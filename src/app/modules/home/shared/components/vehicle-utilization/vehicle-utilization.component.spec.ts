import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleUtilizationComponent } from './vehicle-utilization.component';

describe('VehicleUtilizationComponent', () => {
  let component: VehicleUtilizationComponent;
  let fixture: ComponentFixture<VehicleUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
