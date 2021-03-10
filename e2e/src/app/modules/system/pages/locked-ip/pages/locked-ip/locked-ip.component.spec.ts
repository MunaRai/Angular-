import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedIpComponent } from './locked-ip.component';

describe('LockedIpComponent', () => {
  let component: LockedIpComponent;
  let fixture: ComponentFixture<LockedIpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockedIpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
