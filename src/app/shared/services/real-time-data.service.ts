import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs/Subscription';
@Injectable()
export class RealTimeDataService {

  stompClient: any;

  subscriptions: Subscription[] = [];

  trackerList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  selectedTrackerImei$: BehaviorSubject<string> = new BehaviorSubject('');

  public createConnection() {
    const token = localStorage.getItem('p2s_access_token');
    const connection = this.connect();
    connection.connect({token}, frame => {
      const sub = connection.subscribe('/user/queue/trackerList', message => {
        const data = JSON.parse(message.body);
        this.trackerList$.next(data);
      });
      this.subscriptions.push(sub);
    });
  }

  // open connection with the backend socket
  public connect() {
    const url = environment.apiUrl + '/ws';
    const socket = new SockJs(url);
    const stompClient = Stomp.over(socket);
    stompClient.debug = null; // hide stomp connection logs
    this.stompClient = stompClient;
    return stompClient;
  }

  public disconnect() {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect();
    }
    this.subscriptions.map(sub => sub.unsubscribe());
  }

  public getTrackers(): Observable<any> {
    return this.trackerList$.asObservable();
  }

  public setCurrentTrackerImei(imei: string): void {
    this.selectedTrackerImei$.next(imei);
  }

  public getCurrentTrackerImei(): Observable<string> {
    return this.selectedTrackerImei$.asObservable();
  }

}
