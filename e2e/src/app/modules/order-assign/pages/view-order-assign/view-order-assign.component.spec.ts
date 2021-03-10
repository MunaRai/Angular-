import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderAssignComponent } from './view-order-assign.component';

describe('ViewOrderAssignComponent', () => {
  let component: ViewOrderAssignComponent;
  let fixture: ComponentFixture<ViewOrderAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrderAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrderAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
