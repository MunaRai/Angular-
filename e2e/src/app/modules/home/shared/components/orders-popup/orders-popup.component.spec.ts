import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPopupComponent } from './orders-popup.component';

describe('OrdersPopupComponent', () => {
  let component: OrdersPopupComponent;
  let fixture: ComponentFixture<OrdersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
