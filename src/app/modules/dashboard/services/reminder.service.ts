import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpResult } from '@shared/models/http-result.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Reminder } from '@shared/models/reminder.model';

@Injectable()
export class ReminderService {

  constructor(
    private http: HttpClient
  ) { }

//   getTrackerReminder(trackerId: string): Observable<HttpResult> {
//     return (
//       this.http
//         .get<any>(`/reminder/list/${trackerId}`)
//         .catch(err => {
//           return Observable.throw(err);
//         })
//     );
// }

getReminder( {page, size, sort } ): Observable<any> {
  const params = new HttpParams()
    .set('size', size)
    .set('page', page)
    .set('sort', sort);
  return (
    this.http
      .get<any>('/reminder/list', { params })
      .catch(err => {
        return Observable.throw(err);
      })
  );
}

getTrigerredReminder( {page, size, sort } ): Observable<any> {
  const params = new HttpParams()
    .set('size', size)
    .set('page', page)
    .set('sort', sort);
  return (
    this.http
      .get<any>('/reminder/triggeredList', { params })
      .catch(err => {
        return Observable.throw(err);
      })
  );
}

createReminder(reminder){
  return (
    this.http
      .post(`/reminder/add`, { ...reminder })
      .catch(err => {
        return Observable.throw(err);
      })
  ); 
}

updateReminder(reminder: Reminder, reminderId ){
  return (
    this.http
      .put(`/reminder/edit/${reminderId}`, { ...reminder })
      .catch(err => {
        return Observable.throw(err);
      })
  );
}

  pauseReminder(reminderId){
    return (
      this.http
      .put(`/reminder/pause/${reminderId}`, { reminderId })
        .catch(err => {
          return Observable.throw(err);
        })
    )
  }
  resumeReminder(reminderId){
    return (
      this.http
      .put(`/reminder/resume/${reminderId}`, { ...reminderId })
        .catch(err => {
          return Observable.throw(err);
        })
    )
  }
  deleteReminder(reminderId) {
    return (
      this.http
        .delete('/reminder/delete/'+ reminderId)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  searchReminder(keyword): Observable<any> {
    return (
      this.http
        .get<any>('/reminder/search/' + keyword)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }
// updateReminder(reminder: Reminder, reminderId){
//   return (
//     this.http
//       .put(`/reminder/edit/${reminder.reminderId}`, { ...reminder })
//       .catch(err => {
//         return Observable.throw(err);
//       })
//   );
// }

  // pauseReminder(reminderId) {
    
  //   return (
  //     this.http
  //       .put(`/reminder/pause/`+reminderId)
  //       .catch(err => {
  //         return Observable.throw(err);
  //       })
  //   );
  // }

  // createReminder(reminder, trackerId){
  //   return (
  //     this.http
  //       .post(`/reminder/add/${trackerId}`, { ...reminder })
  //       .catch(err => {
  //         return Observable.throw(err);
  //       })
  //   ); 
  // }

  // deleteReminder(reminderId){
  //   const params = new HttpParams().set('reminderId', reminderId);
  //   return (
  //     this.http
  //       .delete(`/reminder/delete/${reminderId}`, { params })
  //       .catch(err => {
  //         return Observable.throw(err);
  //       })
  //   );

  // }


}