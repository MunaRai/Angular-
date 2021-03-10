import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesPermissionPanelComponent } from './features-permission-panel.component';

describe('FeaturesPermissionPanelComponent', () => {
  let component: FeaturesPermissionPanelComponent;
  let fixture: ComponentFixture<FeaturesPermissionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesPermissionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesPermissionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
