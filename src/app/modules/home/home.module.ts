import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '@shared/shared.module';
import { TrackersSummaryComponent } from './shared/components/trackers-summary/trackers-summary.component';
import { OrderSummaryComponent } from './shared/components/order-summary/order-summary.component';
import { OrderFlowComponent } from './shared/components/order-flow/order-flow.component';
import { Ng2OdometerModule } from 'ng2-odometer';
import { OrdersPopupComponent } from './shared/components/orders-popup/orders-popup.component';
import { OrderFilterPipe } from './shared/pipes/order-filter.pipe';
import { FleetComponent } from './pages/fleet/fleet.component';
import { OrderComponent } from './pages/order/order.component';
import { ExpenseChartComponent } from './shared/components/expense-chart/expense-chart.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { VehicleUtilizationComponent } from './shared/components/vehicle-utilization/vehicle-utilization.component';
import { VehiclePerformanceChartComponent } from './shared/components/vehicle-performance-chart/vehicle-performance-chart.component';
import { AddExpensePopupComponent } from './shared/components/expense-chart/add-expense-popup/add-expense-popup.component';
import { FleetService } from './services/fleet.service';
import { ExpenseChartService } from './shared/components/expense-chart.service';
import { VehicleUtilizationChartService } from './shared/components/vehicle-utilization-chart.service';
import { VehiclePerformanceChartService } from './shared/components/vehicle-performance-chart/vehicle-performance-chart.service';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { RealTimeDataService } from '@shared/services/real-time-data.service';
import { OrderManagementService } from '../order-management/services/order-management.service';
import { OdometerPopupComponent } from './shared/components/odometer-popup/odometer-popup.component';
import { OdometerHistoryService } from './shared/components/odometer-history.service';
import { ReminderComponent } from '@shared/components/reminder-management/pages/reminder/reminder.component';
@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    Ng2OdometerModule.forRoot(),
    Ng2GoogleChartsModule
  ],
  declarations: [
    HomeComponent,
    TrackersSummaryComponent,
    OrderSummaryComponent,
    OrderFlowComponent,
    OrdersPopupComponent,
    OrderFilterPipe,
    FleetComponent,
    OrderComponent,
    ExpenseChartComponent,
    VehicleUtilizationComponent,
    VehiclePerformanceChartComponent,
    AddExpensePopupComponent,
  ],
  entryComponents: [
    OrdersPopupComponent,
   AddExpensePopupComponent,
    OdometerPopupComponent,
    ReminderComponent
  ],
  providers: [
    FleetService,
    ExpenseChartService,
    TrackerListService,
    RealTimeDataService,
    OrderManagementService,
    VehicleUtilizationChartService,
    VehiclePerformanceChartService,
    OdometerHistoryService
  ]
})
export class HomeModule { }
