import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './pages/reports/reports.component';
import { SharedModule } from '@shared/shared.module';
import { ReportServiceService } from './pages/service/report-service.service';
import { GeneratePopupComponent } from './shared/components/generate-popup/generate-popup.component';
import { SchedulePopupComponent } from './shared/components/schedule-popup/schedule-popup.component';
import { DisplayReportComponent } from './shared/components/display-report/display-report.component';
import { QuickOverviewComponent } from './pages/quick-overview/quick-overview.component';
import { OverSpeedComponent } from './pages/over-speed/over-speed.component';
import { ExpenseReportComponent } from './pages/expense-report/expense-report.component';
import { HaltReportComponent } from './pages/halt-report/halt-report.component';
import { FleetReportComponent } from './pages/fleet-report/fleet-report.component';
import { FuelConsumptionReportComponent } from './pages/fuel-consumption-report/fuel-consumption-report.component';
import { TemperatureReportComponent } from './pages/temperature-report/temperature-report.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { TripReportComponent } from './pages/trip-report/trip-report.component';
import { ExportToExcelService } from './services/export-to-excel.service';
@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    Ng2GoogleChartsModule,
  ],
  declarations: [ReportsComponent,
    GeneratePopupComponent,
    SchedulePopupComponent,
    DisplayReportComponent,
    QuickOverviewComponent,
    OverSpeedComponent,
    ExpenseReportComponent,
    HaltReportComponent,
    FleetReportComponent,
    FuelConsumptionReportComponent,
    TemperatureReportComponent,
    TripReportComponent
  ],
  entryComponents: [
    GeneratePopupComponent,
    SchedulePopupComponent,
    DisplayReportComponent
  ],
  providers: [
    ReportServiceService,
    ExportToExcelService
  ]
})
export class ReportsModule { }

