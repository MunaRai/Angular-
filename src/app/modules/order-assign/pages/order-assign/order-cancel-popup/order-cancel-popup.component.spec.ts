import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCancelPopupComponent } from './order-cancel-popup.component';

describe('OrderCancelPopupComponent', () => {
  let component: OrderCancelPopupComponent;
  let fixture: ComponentFixture<OrderCancelPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCancelPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
