import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceManagementFormPopupComponent } from './geofence-management-form-popup.component';

describe('GeofenceManagementFormPopupComponent', () => {
  let component: GeofenceManagementFormPopupComponent;
  let fixture: ComponentFixture<GeofenceManagementFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceManagementFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceManagementFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
