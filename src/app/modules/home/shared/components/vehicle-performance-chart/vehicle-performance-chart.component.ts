import { Component, OnInit, Input } from '@angular/core';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { VehiclePerformanceChartService } from './vehicle-performance-chart.service';
import { Observable } from 'rxjs/Observable';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { takeUntil } from 'rxjs/operators';
import { WithDestroy } from '@shared/classes/withDestory';

@Component({
  selector: 'p2s-vehicle-performance-chart',
  templateUrl: './vehicle-performance-chart.component.html',
  styleUrls: ['./vehicle-performance-chart.component.scss']
})
export class VehiclePerformanceChartComponent extends WithDestroy implements OnInit {

  isPanelOpen = true;

  noData = true;

  @Input()
  selectedTracker: LiveTracker;

  @Input()
  data: LiveTracker[] = [];

  currentTrackerImeiNumber: number;

  loading: Observable<boolean>;

  chartData: any = {
    chartType: 'AreaChart',
    dataTable: [
      ['Time ', 'Fuel', 'Speed', 'Distance'],
      ['1am', 100, 0, 0],
      ['2am', 99, 14, 15],
      ['3am', 96, 25, 30],
      ['4am', 80, 30, 40],
      ['6am', 75, 40, 40],
      ['7am', 70, 45, 40],
      ['8am', 60, 55, 40],
      ['9am', 55, 70, 45],
      ['10am', 52, 69, 50],
      ['11am', 44, 64, 70],
      ['12am', 44, 60, 80],
      ['1pm', 44, 55, 80],
      ['2pm', 21, 56, 80],
      ['3pm', 19, 58, 80],
      ['4pm', 11, 70, 90],
      ['5pm', 90, 120, 90],
      ['6pm', 89, 98, 130],
      ['7pm', 86, 88, 135],
    ],
    formatters: [
      {
        columns: [1],
        type: 'NumberFormat',
        options: {
          suffix: ' Ltr'
        }
      },
      {
        columns: [2],
        type: 'NumberFormat',
        options: {
          suffix: ' Km/hr'
        }
      },

      {
        columns: [3],
        type: 'NumberFormat',
        options: {
          suffix: ' Km'
        }
      }
    ],
    options: {
      title: 'Performance Analysis - Today',
      vAxis: { title: '<---- Ltr  ---  Km/hr  ---  Km ---->' },
      hAxis: { title: 'Time' },
      'chartArea': {
        left: 60,
        top: 30,
        width: '75%',
        height: '80%'
      },
      'height': 300,
      colors: ['blue', 'green', 'red']
    }
  };

  constructor(
    private spinner: NgxSpinnerService,
    private vehiclePerformanceService: VehiclePerformanceChartService,
    private trackerListService: TrackerListService
  ) {
    super();
  }

  ngOnInit() {
    this.getSelectedTracker();
  }

  getSelectedTracker() {
    this.trackerListService.getCurrentTracker()
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(tracker => {
        // only fetch data if the tracker is changed
        if (
            tracker &&
            (
              !this.selectedTracker ||
              this.selectedTracker.trackerImeiNumber !== tracker.trackerImeiNumber
            )
         ) {
          this.noData = false;
          this.selectedTracker = tracker;
          this.fetchData();
        }
      });
  }

  fetchData() {
    this.spinner.show();
    this.vehiclePerformanceService.getVehiclePerformance(this.selectedTracker.trackerImeiNumber)
      .finally(() => this.spinner.hide())
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data) => {
          if (data) {
            this.chartData = {
              ...this.chartData,
              dataTable: [
                ['Time ', 'Fuel', 'Speed', 'Distance'],
                ...data
              ]
            };
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
