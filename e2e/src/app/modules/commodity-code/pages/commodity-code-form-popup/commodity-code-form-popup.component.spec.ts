import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityCodeFormPopupComponent } from './commodity-code-form-popup.component';

describe('CommodityCodeFormPopupComponent', () => {
  let component: CommodityCodeFormPopupComponent;
  let fixture: ComponentFixture<CommodityCodeFormPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityCodeFormPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityCodeFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
