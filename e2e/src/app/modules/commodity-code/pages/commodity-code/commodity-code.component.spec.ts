import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityCodeComponent } from './commodity-code.component';

describe('CommodityCodeComponent', () => {
  let component: CommodityCodeComponent;
  let fixture: ComponentFixture<CommodityCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommodityCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
