import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './pages/reports/reports.component';
import { QuickOverviewComponent } from './pages/quick-overview/quick-overview.component';
import { OverSpeedComponent } from './pages/over-speed/over-speed.component';
import { ExpenseReportComponent } from './pages/expense-report/expense-report.component';

import { HaltReportComponent } from './pages/halt-report/halt-report.component';
import { FleetReportComponent } from './pages/fleet-report/fleet-report.component';
import { FuelConsumptionReportComponent } from './pages/fuel-consumption-report/fuel-consumption-report.component';
import { TemperatureReportComponent } from './pages/temperature-report/temperature-report.component';
import { TripReportComponent } from './pages/trip-report/trip-report.component';
const routes: Routes = [
  {
    path: '',
    component: ReportsComponent
  },

  {
    path: 'quick-overview/:id/:fromDate/:toDate',
    component: QuickOverviewComponent
  },
  {
    path: 'over-speed/:id/:trackerName/:fromDate/:toDate/:speed',
    component: OverSpeedComponent
  },
  {
    path: 'expense-report/:id/:trackerName/:expenseType/:fromDate/:toDate',
    component: ExpenseReportComponent
  },
  
  {
    path: 'halt-report/:id/:trackerName/:fromDate/:toDate',
    component: HaltReportComponent
  },
  {
    path: 'fleet-report/:id/:trackerName/:fromDate/:toDate',
    component: FleetReportComponent
  },
  {
    path: 'trip-report/:id/:trackerName/:fromDate/:toDate',
    component: TripReportComponent
  },
  {
    path:'fuel/:id/:trackerName/:fromDate/:toDate',
    component:FuelConsumptionReportComponent
  },
  {
    path:'temp/:id/:trackerName/:fromDate/:toDate',
    component:TemperatureReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
