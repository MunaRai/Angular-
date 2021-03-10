import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseAssignComponent } from './license-assign.component';

describe('LicenseAssignComponent', () => {
  let component: LicenseAssignComponent;
  let fixture: ComponentFixture<LicenseAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
