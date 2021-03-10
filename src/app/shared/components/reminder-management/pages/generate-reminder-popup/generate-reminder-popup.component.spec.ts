import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReminderPopupComponent } from './generate-reminder-popup.component';

describe('GenerateReminderPopupComponent', () => {
  let component: GenerateReminderPopupComponent;
  let fixture: ComponentFixture<GenerateReminderPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateReminderPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReminderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
