import { NgModule, ModuleWithProviders } from '@angular/core';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { AuthGuard } from '@shared/guards/auth/auth.guard';
import { NgbModule, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableTopBarComponent } from '@shared/components/table-top-bar/table-top-bar.component';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from '@shared/components/table-pagination/table-pagination.component';
import { Helper } from '@shared/helpers/helper';
import { UserFormPopupComponent } from '@shared/components/user-form-popup/user-form-popup.component';
import { FormGroupComponent } from '@shared/components/form-group/form-group.component';
import { NgbDateCustomParserFormatter } from '@shared/services/date-picker-formatter.service';
import { DeleteConfirmationPopupComponent } from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { ListPageTemplateComponent } from '@shared/components/list-page-template/list-page-template.component';
import { SwitchComponent } from '@shared/components/switch/switch.component';
import { TipComponent } from '@shared/components/tip/tip.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiUrlInterceptorService } from '@shared/services/api-url-interceptor.service';
import { TrackersListComponent } from '@shared/components/trackers-list/trackers-list.component';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NgxSpinnerModule } from '@shared/modules/ngx-spinner';
import { SaveCancelBtnComponent } from '@shared/components/save-cancel-btn/save-cancel-btn.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { ListSelectorComponent } from '@shared/components/list-selector/list-selector.component';
import { AgmCoreModule } from '@agm/core';
import { TrackerHistoryComponent } from '@shared/components/trackers-list/tracker-history/tracker-history.component';
import { NgbDateModelFormatter } from '@shared/services/date-model-formatter.service';
import { IdFilterPipe } from '@shared/pipes/id-filter.pipe';
import { UserDetailService } from '@shared/services/user-detail.service';
import { DndModule } from 'ngx-drag-drop';
import { TrackerFilterPipe } from './pipes/tracker-filter.pipe';
import { TrackerOverviewComponent } from '@shared/components/tracker-overview/tracker-overview.component';
import { WizardModule } from './components/wizard/wizard.module';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { AgmDirectionModule } from 'agm-direction';
import { Ng2OdometerModule } from 'ng2-odometer';
import { OdometerPopupComponent } from 'app/modules/home/shared/components/odometer-popup/odometer-popup.component';
import { ReminderComponent } from './components/reminder-management/pages/reminder/reminder.component';
import {
  GenerateReminderPopupComponent
} from './components/reminder-management/pages/generate-reminder-popup/generate-reminder-popup.component';
import { ChartsModule } from 'ng2-charts';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioGroupComponent } from './components/radio-group/radio-group.component';
import { NoRecordComponent } from './components/no-record/no-record.component';

const DECLARATIONS: any[] = [
  SpinnerComponent,
  TableTopBarComponent,
  TablePaginationComponent,
  UserFormPopupComponent,
  FormGroupComponent,
  DeleteConfirmationPopupComponent,
  ListPageTemplateComponent,
  SwitchComponent,
  TipComponent,
  TrackerOverviewComponent,
  TrackersListComponent,
  PageHeaderComponent,
  SaveCancelBtnComponent,
  TimeAgoPipe,
  ListSelectorComponent,
  TrackerHistoryComponent,
  IdFilterPipe,
  TrackerFilterPipe,
  RadioComponent,
  CheckboxComponent,
  RadioGroupComponent,
  OdometerPopupComponent,
  ReminderComponent,
  GenerateReminderPopupComponent,
  NoRecordComponent,
];


@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  imports: [
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLYnIv3wFPwZXDNHUFwPp2NBgup8KsNis',
      libraries: ['places', 'drawing', 'geometry']
    }),
    DndModule,
    WizardModule,
    AgmDirectionModule,
    Ng2OdometerModule,
    ChartsModule
  ],
  exports: [
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AgmCoreModule,
    WizardModule,
    AgmDirectionModule,
    Ng2OdometerModule,
    ChartsModule,
    DndModule,
    ...DECLARATIONS
  ],
  schemas: [],
  providers: [
    AuthGuard,
    UserRoleGuard,
    Helper,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: NgbDateAdapter, useClass: NgbDateModelFormatter },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiUrlInterceptorService,
      multi: true
    },
    TrackerListService,
    UserDetailService
  ],
  entryComponents: [
    DeleteConfirmationPopupComponent, GenerateReminderPopupComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
