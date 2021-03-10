import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAssignTrackerComponent } from './un-assign-tracker.component';

describe('UnAssignTrackerComponent', () => {
  let component: UnAssignTrackerComponent;
  let fixture: ComponentFixture<UnAssignTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAssignTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAssignTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
