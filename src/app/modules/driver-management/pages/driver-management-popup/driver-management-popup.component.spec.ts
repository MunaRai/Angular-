import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverManagementPopupComponent } from './driver-management-popup.component';

describe('DriverManagementPopupComponent', () => {
  let component: DriverManagementPopupComponent;
  let fixture: ComponentFixture<DriverManagementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverManagementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverManagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
