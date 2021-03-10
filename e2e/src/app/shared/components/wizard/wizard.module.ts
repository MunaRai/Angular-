import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './wizard.component';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';
import { WizardFooterComponent } from './wizard-footer/wizard-footer.component';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { WizardStepContentComponent } from './wizard-step-content/wizard-step-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WizardComponent,
    WizardHeaderComponent,
    WizardStepContentComponent,
    WizardFooterComponent,
    WizardStepComponent
  ],
  exports: [
    WizardComponent,
    WizardComponent,
    WizardHeaderComponent,
    WizardStepContentComponent,
    WizardFooterComponent,
    WizardStepComponent
  ],
})
export class WizardModule { }
