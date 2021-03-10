import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerUsersListComponent } from './tracker-users-list.component';

describe('TrackerUsersListComponent', () => {
  let component: TrackerUsersListComponent;
  let fixture: ComponentFixture<TrackerUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
