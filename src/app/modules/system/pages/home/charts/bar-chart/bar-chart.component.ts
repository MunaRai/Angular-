import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/modules/tracker-management/services/tracker.service';

@Component({
  selector: 'p2s-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  isPanelOpen = true;

  noData = false;

  date = new Date();

  currentYear = '';

  chartData: any = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Year', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov','Dec' ],
      ['Trackers ', 13, 7, 4, 3, 3, 1, 2, 3, 12, 23, 12, 23],
    ],
    options: {
      title: 'Trackers - Year',
      vAxis: { title: 'Number' },
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
    private trackerService: TrackerService,
  ) { }

  ngOnInit() {
    this.currentYear = (this.date.getFullYear()).toString();
    this.fetchChartData(this.currentYear);
  }

  fetchChartData(year: any){
    this.trackerService
      .getYearlyChartData(year)
      .subscribe(
        (data) => {
          if(data && data.meta) {
            this.noData = false;
            
            const dataTable = [
              ['Year', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov','Dec' ],
              ['Trackers', 
                data.meta.januaryCount, data.meta.februaryCount, data.meta.marchCount, data.meta.aprilCount, 
                data.meta.mayCount, data.meta.juneCount, data.meta.julyCount, data.meta.augustCount, 
                data.meta.septemberCount, data.meta.octoberCount, data.meta.novemberCount, data.meta.decemberCount
              ]
            ];
            this.chartData = Object.assign({}, this.chartData, { dataTable });
          }else {
            const dataTable = [
              ['Year', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov','Dec' ],
              ['Trackers ', 13, 7, 4, 3, 3, 1, 2, 3, 12, 23, 12, 23],
            ];
            this.chartData = Object.assign({}, this.chartData, { dataTable });
            this.noData = true;
          }
        },
        error => {
          
        }
      )
  }

}
