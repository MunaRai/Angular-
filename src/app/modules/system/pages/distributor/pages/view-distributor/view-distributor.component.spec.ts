import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDistributorComponent } from './view-distributor.component';

describe('ViewDistributorComponent', () => {
  let component: ViewDistributorComponent;
  let fixture: ComponentFixture<ViewDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
