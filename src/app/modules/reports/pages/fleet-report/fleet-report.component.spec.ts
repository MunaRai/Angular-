import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetReportComponent } from './fleet-report.component';

describe('FleetReportComponent', () => {
  let component: FleetReportComponent;
  let fixture: ComponentFixture<FleetReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
