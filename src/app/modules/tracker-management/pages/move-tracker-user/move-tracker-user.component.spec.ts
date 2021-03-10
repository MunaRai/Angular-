import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveTrackerUserComponent } from './move-tracker-user.component';

describe('MoveTrackerUserComponent', () => {
  let component: MoveTrackerUserComponent;
  let fixture: ComponentFixture<MoveTrackerUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveTrackerUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveTrackerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
