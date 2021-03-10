import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderAssignPopupComponent } from './order-assign-popup.component';

describe('OrderAssignPopupComponent', () => {
  let component: OrderAssignPopupComponent;
  let fixture: ComponentFixture<OrderAssignPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderAssignPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
