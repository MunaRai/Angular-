import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePopupComponent } from './generate-popup.component';

describe('GeneratePopupComponent', () => {
  let component: GeneratePopupComponent;
  let fixture: ComponentFixture<GeneratePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
