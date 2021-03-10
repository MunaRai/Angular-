import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepContentComponent } from './wizard-step-content.component';

describe('WizardContentComponent', () => {
  let component: WizardStepContentComponent;
  let fixture: ComponentFixture<WizardStepContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardStepContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardStepContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
