import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as SockJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { RouteInformation } from '@shared/models/route-information.model';
@Injectable()
export class RouteInformationService {

  constructor(
    private http : HttpClient
) { }

stompClient: any;

currentRouteInformation$: BehaviorSubject<RouteInformation> = new BehaviorSubject(null);

routeInfo$: BehaviorSubject<RouteInformation> = new BehaviorSubject<RouteInformation>(null);

subscriptions: Subscription[]=[];

public createConnectionForRoute(){
  
  const token = localStorage.getItem('p2s_access_token');
  const connection = this.connect();
  
  connection.connect({token}, frame => {
    const sub = connection.subscribe('/user/queue/routeData', message => {
      const data = JSON.parse(message.body);
      this.routeInfo$.next(data);
    });
    this.subscriptions.push(sub);
  });
}

public connect(){
  const url = environment.apiUrl+'/ws';
  const socket = new SockJs(url);
  const stompClient =Stomp.over(socket);
  stompClient.debug = null ;
  this.stompClient = stompClient;
  return stompClient;

}
public disconnect() {
  if (this.stompClient && this.stompClient.connected) {
    this.stompClient.disconnect();
  }
  this.subscriptions.map(sub => sub.unsubscribe());
}

public getRouteInfo():Observable<any>{
  return this.routeInfo$.asObservable()
}

setRouteInformation(routeInformation: RouteInformation) {
  this.currentRouteInformation$.next(routeInformation);
}

getRouteInformation(): Observable<RouteInformation> {
  return this.currentRouteInformation$.asObservable();
}

}
