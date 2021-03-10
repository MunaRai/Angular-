import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelSensorComponent } from './fuel-sensor.component';

describe('FuelSensorComponent', () => {
  let component: FuelSensorComponent;
  let fixture: ComponentFixture<FuelSensorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelSensorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelSensorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
