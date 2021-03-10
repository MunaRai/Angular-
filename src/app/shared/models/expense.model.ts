import { Time } from "@angular/common";
import { generateId } from "@shared/helpers/helper";
import { ExpenseArray } from "@shared/models/ExpenseArray";

export class Expense{
    expenseAndTrackerId: string;
    expenseId: string;
    expenseType: string;
    expenseAmount: number 
    expenseDate: string;
    // time : Time;
    expenseRemarks : string;
    expenseStatus : string;
    expenseDateCreated : Date;
    expenseDateModified : Date;


    constructor(type, amount, date, remarks){
        // this.expenseId = generateId();
        this.expenseType = type;
        this.expenseAmount = amount;
        this.expenseDate = date;
        this.expenseRemarks = remarks;
        // this.time = null;


    }

}