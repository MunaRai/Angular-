import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCancelBtnComponent } from '@shared/components/save-cancel-btn/save-cancel-btn.component';

describe('SaveCancelBtnComponent', () => {
  let component: SaveCancelBtnComponent;
  let fixture: ComponentFixture<SaveCancelBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveCancelBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCancelBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
