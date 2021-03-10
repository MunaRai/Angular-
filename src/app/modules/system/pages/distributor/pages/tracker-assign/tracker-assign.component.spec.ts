import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerAssignComponent } from './tracker-assign.component';

describe('TrackerAssignComponent', () => {
  let component: TrackerAssignComponent;
  let fixture: ComponentFixture<TrackerAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
