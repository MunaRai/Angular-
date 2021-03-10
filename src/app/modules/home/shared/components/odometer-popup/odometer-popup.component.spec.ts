import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdometerPopupComponent } from './odometer-popup.component';

describe('OdometerPopupComponent', () => {
  let component: OdometerPopupComponent;
  let fixture: ComponentFixture<OdometerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdometerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdometerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
