import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderManagementFormPopupComponent } from './order-management-form-popup.component';

describe('OrderManagementFormPopupComponent', () => {
  let component: OrderManagementFormPopupComponent;
  let fixture: ComponentFixture<OrderManagementFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderManagementFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderManagementFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
