import { HttpResult } from '@shared/models/http-result.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import { Subscription } from 'rxjs/Subscription';
import { Notification } from '@shared/models/notification.model';
import { environment } from 'environments/environment.prod';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationService {

  notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject([]);

  count$: BehaviorSubject<number> = new BehaviorSubject(0);

  subs: Subscription[] = [];

  count = 0;
  notificationCount = 0;

  stompClient: any;

  notifications: Notification[] = [];

  apiUrl = '/notification/list';

  loading$: Subject<boolean> = new Subject();

  constructor(
    private http: HttpClient
  ) {
    this.fetchNotifications();
  }

  fetchNotifications(skip = 0): void {
    const params = new HttpParams().append('skip', skip.toString());
    const sub = this.http.get<HttpResult>(this.apiUrl, { params })
      .subscribe(({ meta, result }) => {
        const notifications = [];
        if (result.length) {
          result.map(res => notifications.push(res));
        }
        this.notifications$.next(notifications);
        this.notifications = notifications;
        if (meta) {
          this.count = meta;
          this.count$.next(meta);
        }
        this.createWebSocketConnection();
      });
    this.subs.push(sub);
  }

  getMoreNotifications(skip: number): void {
    this.loading$.next(true);
    const params = new HttpParams().append('skip', skip.toString());
    const sub = this.http.get<HttpResult>(this.apiUrl, { params })
      .subscribe(({ meta, result }) => {
        this.loading$.next(false);
        this.notifications$.next(this.notifications.concat(result));
      });
  }

  getTrackerAlarms(trackerId: string): Observable<HttpResult> {
    return (
      this.http
        .get<any>(`/notification/view/${trackerId}`)
        .catch(err => {
          return Observable.throw(err);
        })
    );
  }

  getNotifications() {
    return this.notifications$.asObservable();
  }

  createWebSocketConnection() {
    const token = localStorage.getItem('p2s_access_token');
    const connection = this.connect();

    connection.connect({ token }, frame => {

      const sub = connection.subscribe('/user/queue/notification', message => {
        const data = JSON.parse(message.body);
      });
      this.subs.push(sub);
    });
  }

  markAllAsSeen(): void {
    this.http.post('/notification/markAllAsSeen', '').subscribe(result => {
      this.count = 0;
      this.notificationCount = 0;
      this.count$.next(0);
    });
  }

  markCurrentAsSeen(notificationId: string): Observable<any> {
    return this.http.get<any>('/notification/seen/' + notificationId);
  }

  getNotificationsCount() {
    return this.count$.asObservable();
  }

  unsub() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect();
    }
    this.subs.map(sub => sub.unsubscribe());
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  connect() {
    const url = environment.apiUrl + '/ws';
    const socket = new SockJs(url);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null; // hide stomp connection logs
    this.stompClient = stompClient;
    return stompClient;
  }

  fetchCount(skip = 0): any {
    const params = new HttpParams().append('skip', skip.toString());
    return this.http.get<any>(this.apiUrl, { params })
  }


}

