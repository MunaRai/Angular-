import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelConsumptionReportComponent } from './fuel-consumption-report.component';

describe('FuelConsumptionReportComponent', () => {
  let component: FuelConsumptionReportComponent;
  let fixture: ComponentFixture<FuelConsumptionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelConsumptionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelConsumptionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
