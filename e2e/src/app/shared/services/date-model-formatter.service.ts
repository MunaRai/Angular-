import { NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
@Injectable()
export class NgbDateModelFormatter extends NgbDateAdapter<any> {

  fromModel(date) {
    if(date) {
      date = new Date(date);
    }
    return date ?
      {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      } : null;
  }

  toModel(date) {
    return date ?
      new Date(
        `${isNumber(date.month) ? padNumber(date.month) : ''} /${isNumber(date.day) ? padNumber(date.day) : ''}/${date.year}`
      ) : null;
  }
}
