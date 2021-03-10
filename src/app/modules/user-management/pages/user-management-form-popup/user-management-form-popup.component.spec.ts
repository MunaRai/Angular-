import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementFormPopupComponent } from './user-management-form-popup.component';

describe('UserManagementFormPopupComponent', () => {
  let component: UserManagementFormPopupComponent;
  let fixture: ComponentFixture<UserManagementFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
