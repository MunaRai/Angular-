import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseLogsComponent } from './license-logs.component';

describe('LicenseLogsComponent', () => {
  let component: LicenseLogsComponent;
  let fixture: ComponentFixture<LicenseLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
