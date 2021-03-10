import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTrackerPopupComponent } from './assign-tracker-popup.component';

describe('AssignTrackerPopupComponent', () => {
  let component: AssignTrackerPopupComponent;
  let fixture: ComponentFixture<AssignTrackerPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTrackerPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTrackerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
