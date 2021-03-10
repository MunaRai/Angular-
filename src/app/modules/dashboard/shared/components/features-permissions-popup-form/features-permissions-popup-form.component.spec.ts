import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesPermissionsPopupFormComponent } from './features-permissions-popup-form.component';

describe('FeaturesPermissionsPopupFormComponent', () => {
  let component: FeaturesPermissionsPopupFormComponent;
  let fixture: ComponentFixture<FeaturesPermissionsPopupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesPermissionsPopupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesPermissionsPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
