import { Time } from "@angular/common";

export class Reminder {
  reminderId: string;
  reminderStartDate: Date;
  reminderEndDate: Date;
  reminderSubject: string;
  reminderBody: string;
  reminderIsSeen: boolean;
  reminderIsDisable: boolean
  reminderIsTriggered: boolean;
  fromDate: Date;
  toDate: Date;
  fromTime: Time;
  toTime: Time;

}


// import { addYears } from "date-fns";

// export class Reminder {
//     reminderId: string;
//    reminderBasedOn: string;
//    reminderDate: Date;
//    notifyBeforeDate: Date;
//    reminderStartDate?: Date;
//    reminderEndDate?: Date;
//    reminderDateModified?: Date;
//    reminderDateCreated: Date;
//    remark?: string;
//    email:  string;
//    distance?: string;
//    engineHours?: string;
// //    status: string;

//    constructor() {
//     this.reminderDate = new Date();
//     // this.reminderStartDate = new Date();
//     // this.reminderEndDate = addYears(new Date(), 1);
//     // this.status = 'UPCOMING';
//     // this.reminderBasedOn = 'distance';
//    }
// }