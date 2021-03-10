import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { VehicleUtilizationChartService } from '../vehicle-utilization-chart.service';
import { Tracker } from '@shared/models/tracker.model';

@Component({
  selector: 'p2s-vehicle-utilization',
  templateUrl: './vehicle-utilization.component.html',
  styleUrls: ['./vehicle-utilization.component.scss']
})
export class VehicleUtilizationComponent implements OnChanges {

  isPanelOpen = true;

  noData = false;

  @Input()
  selectedTracker: Tracker;

  currentTrackerImeiNumber: number;

  @Input()
  data: LiveTracker[] = [];

  selectedItem: Tracker = null;

  chartData: any = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Hours', 'Moving hrs', 'Stopped hrs', 'Idle hrs'],
      ['Vechicle State', 13, 7, 4],
    ],
    options: {
      title: 'Vehicle Utilization - Today',
      vAxis: { title: 'Hours' },
      'chartArea': {
        left: 30,
        top: 15,
        width: '65%',
        height: '80%'
      },
      'height': 300,
    }
  };

  constructor(
    private spinner: NgxSpinnerService,
    private vehicleService: VehicleUtilizationChartService
  ) { }

  ngOnChanges(changes) {
    if (+this.selectedTracker.trackerImeiNumber !== +this.currentTrackerImeiNumber) {
      this.fetchData();
      this.currentTrackerImeiNumber = +this.selectedTracker.trackerImeiNumber;
    }
  }

  fetchData() {
    this.spinner.show();
    this.vehicleService.getVehicleUtilization(this.selectedTracker.trackerImeiNumber)
      .finally(() => this.spinner.hide())
      .subscribe(
        (data) => {
          if (data) {
            const newData = Object.assign({}, this.chartData);
            newData.dataTable[1] = data;
            this.chartData = newData;
            this.noData = false;
          } else {
            this.noData = true;
          }
        },

        err => {
          this.noData = true;
        }
      );
  }
}