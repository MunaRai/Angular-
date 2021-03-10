import { generateId } from "@shared/helpers/helper";
import { Time } from "@angular/common";

export class Report {
    reportId: string;
    fromDate: Date;
    toDate: Date;
    duration: String;
    metric:string;
    format: string;
    speedLimit: number;
    timeAndSec: Date;
    fromTime: Time;
    toTime: Time;
    expenseType: string;

  constructor(){
      this.reportId = generateId();
      this.duration ='Last 30 days';
      this.metric = 'Kilometers';
      this.format = 'Html';   
 }
}