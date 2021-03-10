import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerFormPopupComponent } from './tracker-form-popup.component';

describe('TrackerFormPopupComponent', () => {
  let component: TrackerFormPopupComponent;
  let fixture: ComponentFixture<TrackerFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
