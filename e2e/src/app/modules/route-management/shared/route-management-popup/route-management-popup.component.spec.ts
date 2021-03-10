import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteManagementPopupComponent } from './route-management-popup.component';

describe('RouteManagementPopupComponent', () => {
  let component: RouteManagementPopupComponent;
  let fixture: ComponentFixture<RouteManagementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteManagementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteManagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
