import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackersListComponent } from '@shared/components/trackers-list/trackers-list.component';

describe('TrackersListComponent', () => {
  let component: TrackersListComponent;
  let fixture: ComponentFixture<TrackersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
