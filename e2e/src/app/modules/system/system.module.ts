import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { BarChartComponent } from './pages/home/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './pages/home/charts/pie-chart/pie-chart/pie-chart.component';
import { DistributorService } from './pages/distributor/services/distributor.service';
import { TrackerService } from '../tracker-management/services/tracker.service';
import { LicenseService } from './pages/license/services/license.service';
import { UserService } from '../user-management/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    Ng2GoogleChartsModule,
  ],

  providers: [
    DistributorService , TrackerService, LicenseService, UserService
  ],
  declarations: [HomeComponent, BarChartComponent, PieChartComponent]
})
export class SystemModule { }
