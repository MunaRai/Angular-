import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'app/modules/tracker-management/services/tracker.service';

@Component({
  selector: 'p2s-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  isPanelOpen = true;

  currentYear = '';

  currentMonth : number;
  
  date = new Date();

  totalTrackers: number;
  
  monthList: any[]=[
    {
      'monthValue':1, 'monthName':'Jan' , 'monthCode': 'januaryCount'
    },
    {
      'monthValue':2, 'monthName':'Feb' , 'monthCode': 'februaryCount'
    },
    {
      'monthValue':3, 'monthName':'Mar' , 'monthCode': 'marchCount'
    },
    {
      'monthValue':4, 'monthName':'Apr' , 'monthCode': 'aprilCount'
    },
    {
      'monthValue':5, 'monthName':'May' , 'monthCode': 'mayCount'
    },
    {
      'monthValue':6, 'monthName':'Jun' , 'monthCode': 'juneCount'
    },
    {
      'monthValue':7, 'monthName':'Jul' , 'monthCode': 'julyCount'
    },
    {
      'monthValue':8, 'monthName':'Aug' , 'monthCode': 'augustCount'
    },
    {
      'monthValue':9, 'monthName':'Sep' , 'monthCode': 'septemberCount'
    },
    {
      'monthValue':10, 'monthName':'Oct' , 'monthCode': 'octoberCount'
    },
    {
      'monthValue':11, 'monthName':'Nov' , 'monthCode': 'novemberCount'
    },
    {
      'monthValue':12, 'monthName':'Dec' , 'monthCode': 'decemberCount'
    }
  ]
  
  chartData = {
    chartType: 'PieChart',
    dataTable: [
      ['Type',    'Number'],
      ['Moving',  '500'],
      ['Idle',    '300'],
      ['Stopped', '10000']
    ],
    formatters: [
      {
        columns: [1],
        type: 'NumberFormat',
        options: {
        prefix: ' ', negativeColor: 'red', negativeParens: true
        }
      }
    ],
    options: {
      'title': 'Total Trackers',
      'allowHtml': true,
      'chartArea': {
        left: 15,
        top: 15,
        width: '100%',
        height: '100%'
      },
      'height': 300,
    },
  };

  noData = false;
  

  constructor(
    private trackerService: TrackerService,
  ) { }

  ngOnInit() {
    this.currentYear = (this.date.getFullYear().toString());
    this.currentMonth = (this.date.getMonth() * 1 + 1);

    this.fetchChartData();
  }



  fetchChartData(){
    this.trackerService
      .getMonthlyChartData()
      .subscribe(
        (data) => {
          if(data && data.meta) {
            this.noData = false;

            const dataTable = [
              ['Type', 'Number'],
              ['Day1', data.meta.day1],['Day2', data.meta.day2],['Day3', data.meta.day3],['Day4', data.meta.day4],
              ['Day5', data.meta.day5],['Day6', data.meta.day6],['Day7', data.meta.day7],['Day8', data.meta.day8],
              ['Day9', data.meta.day9],['Day10', data.meta.day10],['Day11', data.meta.day11],['Day12', data.meta.day12],
              ['Day13', data.meta.day13],['Day14', data.meta.day14],['Day15', data.meta.day15],['Day16', data.meta.day16],
              ['Day17', data.meta.day17],['Day18', data.meta.day18],['Day19', data.meta.day19],['Day20', data.meta.day20],
              ['Day21', data.meta.day21],['Day22', data.meta.day22],['Day23', data.meta.day23],['Day24', data.meta.day24],
              ['Day25', data.meta.day25],['Day26', data.meta.day26],['Day27', data.meta.day1],['Day28', data.meta.day28],
              ['Day29', data.meta.day29],['Day30', data.meta.day30],['Day31', data.meta.day31],['Day32', data.meta.day32]
            ]
            
            this.chartData = Object.assign({}, this.chartData, { dataTable });
          }else {
            const dataTable = [
              ['Type', 'Number'],
              ['Jan ', 1],
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


export interface MonthList {
  monthValue: number;
  monthName: string;
}
