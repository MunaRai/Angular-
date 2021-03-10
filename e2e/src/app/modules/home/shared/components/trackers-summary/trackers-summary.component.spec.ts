import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackersSummaryComponent } from './trackers-summary.component';

describe('TrackersSummaryComponent', () => {
  let component: TrackersSummaryComponent;
  let fixture: ComponentFixture<TrackersSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackersSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
