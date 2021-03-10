import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTrackerDistributorComponent } from './assign-tracker-distributor.component';

describe('AssignTrackerDistributorComponent', () => {
  let component: AssignTrackerDistributorComponent;
  let fixture: ComponentFixture<AssignTrackerDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTrackerDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTrackerDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
