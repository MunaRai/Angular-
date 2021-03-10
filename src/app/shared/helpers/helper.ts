import { Injectable } from '@angular/core';

@Injectable()
export class Helper {

  /**
   * Helper method for deep cloning objects
   *
   * @param {any} obj
   * @memberof Helper
   * returns object
   */
  deepClone(obj: any): any {
    const result = {};
    Object.keys(obj).map(key => {
      // if the value is object and not date and array, deep clone that as well
      if (typeof obj[key] === 'object' && !(Array.isArray(obj[key])) && !(obj[key] instanceof Date)) {
        result[key] = this.deepClone(obj[key]);
      } else {
        result[key] = obj[key];
      }
    });
    return result;
  }

  /**
   * Helper method for converting date format from js to ngb or ngb to js
   *
   * @param {any} date
   * @param {boolean} ngbType
   * @memberof Helper
   * returns js date Object or ngbDateObject
   */
  convertDateFormat(date: any, ngbType = false): any {
    if (ngbType) {
      date = new Date(date);
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
    }

    return new Date(`${date.month}, ${date.day}, ${date.year}`).getTime();
  }
}

/**
   * Helper method for converting date format from js to ngb or ngb to js
   *
   * @param {any} date
   * @param {boolean} ngbType
   * returns js date Object or ngbDateObject
   */
export function convertDateFormat(date: any, ngbType = false): any {
  if (ngbType) {
    date = new Date(date);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
    // return date.getMilliseconds();
  }

  return new Date(`${date.month}, ${date.day}, ${date.year}`).getTime();
  // return new Date(date.getMilliseconds);
}

/**
 * Helper method for generating random ID of length 6
 * Uses current timestamp as date
 *
 * @export {function} generateId
 * @param {any} prefix
 * @returns {string}
 */
export function generateId(prefix = ''): string {
  return prefix + new Date().getTime().toString().slice(-6);
}

/**
 * Helper method for deep cloning objects
 *
 * @param {any} obj
 * returns object
 */
export function deepClone(obj: any): any {
  const result = {};
  Object.keys(obj).map(key => {
    // if the value is object and not date and array, deep clone that as well
    if (typeof obj[key] === 'object' && !(Array.isArray(obj[key])) && !(obj[key] instanceof Date)) {
      result[key] = this.deepClone(obj[key]);
    } else {
      result[key] = obj[key];
    }
  });
  return result;
}

export function logError(error: any): any {
  console.error(error);
}
