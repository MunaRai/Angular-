import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteStopListPopupComponent } from './route-stop-list-popup.component';

describe('RouteStopListPopupComponent', () => {
  let component: RouteStopListPopupComponent;
  let fixture: ComponentFixture<RouteStopListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteStopListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteStopListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
