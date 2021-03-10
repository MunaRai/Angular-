import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Expense } from '@shared/models/expense.model';
import { HttpResult } from '@shared/models/http-result.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ExpenseChartService {
  constructor(private http: HttpClient) {}

  getExpense(trackerId: string): Observable<any> {
    return this.http
      .get<any>(`/trackerExpense/expense/${trackerId}`)
      .pipe(
        map(res => {
          if (res.length) {
            // accumulate result
            const result = res.reduce((expenseMap, current) => {
              if (!expenseMap[current.expenseType]) {
                expenseMap[current.expenseType] = current.expenseAmount;
              } else {
                expenseMap[current.expenseType] += current.expenseAmount;
                // total = total+(current.expenseAmount);
              }
              return expenseMap;
            }, {});

            // convert to chart data format
            const formatted = [['Type', 'Cost']];
            Object.keys(result).map(key => {
              formatted.push([key, result[key]]);
            });
            return formatted;
          }
          return res;
        })
      )
      .catch(err => {
        return Observable.throw(err);
      });
  }

  createExpense(expenses, trackerId) {
    return this.http
      .post(`/trackerExpense/add/${trackerId}`, expenses)
      .catch(err => {
        return Observable.throw(err);
      });
  }

  deleteExpense(expenseId) {
    const params = new HttpParams().set('expenseId', expenseId);
    return this.http.delete(`/expense/delete`, { params }).catch(err => {
      return Observable.throw(err);
    });
  }

  updateExpense(expense) {
    return this.http.put('/expense/edit', { ...expense }).catch(err => {
      return Observable.throw(err);
    });
  }
}
