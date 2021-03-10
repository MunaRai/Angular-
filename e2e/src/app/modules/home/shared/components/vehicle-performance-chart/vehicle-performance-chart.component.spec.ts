import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePerformanceChartComponent } from './vehicle-performance-chart.component';

describe('VehiclePerformanceChartComponent', () => {
  let component: VehiclePerformanceChartComponent;
  let fixture: ComponentFixture<VehiclePerformanceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclePerformanceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclePerformanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
