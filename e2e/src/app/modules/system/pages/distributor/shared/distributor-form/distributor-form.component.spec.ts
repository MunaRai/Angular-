import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorFormComponent } from './distributor-form.component';

describe('DistributorFormComponent', () => {
  let component: DistributorFormComponent;
  let fixture: ComponentFixture<DistributorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
