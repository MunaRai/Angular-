import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceAssignmentPopupComponent } from './geofence-assignment-popup.component';

describe('GeofenceAssignmentPopupComponent', () => {
  let component: GeofenceAssignmentPopupComponent;
  let fixture: ComponentFixture<GeofenceAssignmentPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceAssignmentPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceAssignmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
