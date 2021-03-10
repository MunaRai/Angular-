import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerHistoryComponent } from '@shared/components/trackers-list/tracker-history/tracker-history.component';

describe('TrackerHistoryComponent', () => {
  let component: TrackerHistoryComponent;
  let fixture: ComponentFixture<TrackerHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
