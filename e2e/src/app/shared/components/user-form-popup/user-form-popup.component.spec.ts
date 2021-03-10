import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormPopupComponent } from '@shared/components/user-form-popup/user-form-popup.component';

describe('UserFormPopupComponent', () => {
  let component: UserFormPopupComponent;
  let fixture: ComponentFixture<UserFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
