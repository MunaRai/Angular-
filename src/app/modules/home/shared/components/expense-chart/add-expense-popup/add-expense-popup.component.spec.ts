import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpensePopupComponent } from './add-expense-popup.component';

describe('AddExpensePopupComponent', () => {
  let component: AddExpensePopupComponent;
  let fixture: ComponentFixture<AddExpensePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpensePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
