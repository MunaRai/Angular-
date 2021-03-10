import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelSensorPopupComponent } from './fuel-sensor-popup.component';

describe('FuelSensorPopupComponent', () => {
  let component: FuelSensorPopupComponent;
  let fixture: ComponentFixture<FuelSensorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelSensorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelSensorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
