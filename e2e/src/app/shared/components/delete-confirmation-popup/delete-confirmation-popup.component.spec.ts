import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';

describe('DeleteConfirmationPopupComponent', () => {
  let component: DeleteConfirmationPopupComponent;
  let fixture: ComponentFixture<DeleteConfirmationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteConfirmationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
