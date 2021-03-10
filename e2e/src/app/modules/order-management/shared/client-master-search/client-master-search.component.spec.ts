import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMasterSearchComponent } from './client-master-search.component';

describe('ClientMasterSearchComponent', () => {
  let component: ClientMasterSearchComponent;
  let fixture: ComponentFixture<ClientMasterSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientMasterSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientMasterSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
