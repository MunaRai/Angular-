import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTrackerDetailsComponent } from './show-tracker-details.component';

describe('ShowTrackerDetailsComponent', () => {
  let component: ShowTrackerDetailsComponent;
  let fixture: ComponentFixture<ShowTrackerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTrackerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTrackerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
