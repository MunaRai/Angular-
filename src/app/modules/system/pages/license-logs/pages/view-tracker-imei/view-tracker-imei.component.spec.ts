import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrackerImeiComponent } from './view-tracker-imei.component';

describe('ViewTrackerImeiComponent', () => {
  let component: ViewTrackerImeiComponent;
  let fixture: ComponentFixture<ViewTrackerImeiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrackerImeiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrackerImeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
