import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMasterFormPopupComponent } from './client-master-form-popup.component';

describe('ClientMasterFormPopupComponent', () => {
  let component: ClientMasterFormPopupComponent;
  let fixture: ComponentFixture<ClientMasterFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMasterFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMasterFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
