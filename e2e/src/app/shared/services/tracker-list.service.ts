import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpResult } from '@shared/models/http-result.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { LiveTracker } from '@shared/models/live-tracker.model';
import {
  GOOGLE_MAPS_API_KEY,
  SNAP_TO_ROAD_API,
} from '@shared/constants/google.constant';
import { PolyLinePoint } from 'app/modules/live-tracking/pages/live-tracking/history-map/history-map.component';

@Injectable()
export class TrackerListService {
  currentTracker$: BehaviorSubject<LiveTracker> = new BehaviorSubject(null);

  playbackState$: BehaviorSubject<string> = new BehaviorSubject('stop');

  trackerHistory$: BehaviorSubject<LiveTracker[]> = new BehaviorSubject([]);

  currentSub: Subscription;

  parkingTime = 0;
  distance = 0;
  parkingSize = 0;

  constructor(private http: HttpClient) {}

  getTrackersList(): Observable<HttpResult> {
    return this.http.get<HttpResult>('/tracker/protocol/list').pipe(
      map(data => {
        const result = data.result.map(res => {
          if (res) {
            return convertTrackerDetails(res);
          }
          return res;
        });
        const newData = { ...data };
        newData.result = result;
        return newData;
      })
    );
  }

  getTrackersInfo(trackerId: string): Observable<HttpResult> {
    return this.http
      .get<any>(`/tracker/information/${trackerId}`)
      .catch(err => {
        return Observable.throw(err);
      });
  }

  getMeta(trackerId: string, from: Number, to: Number) {
    return this.http.get<any>(`/report/history/${trackerId}/${from}/${to}`);
  }

  fetchTrackerHistory(
    trackerId: string,
    from: Number,
    to: Number
  ): Observable<LiveTracker[]> {
    return this.http
      .get<HttpResult>(`/report/history/${trackerId}/${from}/${to}`)
      .pipe(
        map(res => {
          this.currentTracker$.next(res.result[0]);
          this.trackerHistory$.next(res.result);
          this.playbackState$.next('stop');
          return res.result;
        })
      );
  }

  getTrackerHistory(): Observable<LiveTracker[]> {
    return this.trackerHistory$.asObservable();
  }

  setCurrentTracker(tracker: LiveTracker) {
    this.currentTracker$.next(tracker);
  }

  getCurrentTracker(): Observable<LiveTracker> {
    return this.currentTracker$.asObservable();
  }

  setPlaybackState(state) {
    this.playbackState$.next(state);
  }

  updateTrackerIsFavourite(trackerId, trackerIsFavorite): Observable<any> {
    return this.http.get<any>(
      `/user/trackerfav/${trackerId}/${trackerIsFavorite}`
    );
  }

  getUsersOfDistributor(): Observable<any> {
    return this.http.get<any>('/user/allList').catch(err => {
      return Observable.throw(err);
    });
  }

  getDistributorsOfSystem(): Observable<any> {
    return this.http.get<any>('/distributor/allList').catch(err => {
      return Observable.throw(err);
    });
  }

  getStopsOfSelectedTracker(trackerId): Observable<any> {
    return this.http
      .get<any>('/trackerRoutes/getStops/' + trackerId)
      .catch(err => {
        return Observable.throw(err);
      });
  }

  getRouteInformationOfTracker(trackerId) {
    return this.http
      .get<any>('/routeInformation/latest/' + trackerId)
      .catch(err => {
        return Observable.throw(err);
      });
  }

  snapToRoad(coordinatesList: PolyLinePoint[]) {
    const path = coordinatesList
      .map(coor => `${coor.lat},${coor.lng}`)
      .join('|');
    const params = {
      key: GOOGLE_MAPS_API_KEY,
      path,
      interceptor: 'skip',
      interpolate: 'true',
    };
    // const params = new HttpParams();
    return this.http.get<any>(SNAP_TO_ROAD_API, { params });
  }
}

export function convertTrackerDetails(trackerItem: any) {
  const tracker: LiveTracker = new LiveTracker();
  if (trackerItem.attribute && trackerItem.attribute.length) {
    const attr = trackerItem.attribute[0];
    const {
      gpsAttributeAddress,
      gpsAttributeCourse,
      gpsAttributeLat,
      gpsAttributeLatDirection,
      gpsAttributeLng,
      gpsAttributeLngDirection,
      gpsAttributeSatelliteCount,
      gpsAttributeSpeed,
      gpsAttributeStatus,
      gpsAttributeDateCreated,
      gpsAttributeStatusUpdatedTime,
    } = attr;
    tracker.gpsAttributeAddress = gpsAttributeAddress;
    tracker.gpsAttributeCourse = gpsAttributeCourse;
    tracker.gpsAttributeLat = gpsAttributeLat;
    tracker.gpsAttributeLatDirection = gpsAttributeLatDirection;
    tracker.gpsAttributeLng = gpsAttributeLng;
    tracker.gpsAttributeLngDirection = gpsAttributeLngDirection;
    tracker.gpsAttributeSatelliteCount = gpsAttributeSatelliteCount;
    tracker.gpsAttributeSpeed = gpsAttributeSpeed;
    tracker.gpsAttributeStatus = gpsAttributeStatus;
    tracker.gpsAttributeDateCreated = gpsAttributeDateCreated;
    tracker.gpsAttributeStatusUpdatedTime = gpsAttributeStatusUpdatedTime;
  }

  tracker.gpsIgnition = trackerItem.event.length
    ? trackerItem.event[0].gpsIgnition
    : false;

  const {
    trackerDateUpdated,
    trackerIcon,
    trackerImeiNumber,
    trackerIsFavorite,
    trackerModelName,
    trackerName,
    trackerCode,
    trackerUsers,
    trackerOdometer,
  } = trackerItem;

  tracker.trackerDateUpdated = trackerDateUpdated;
  tracker.trackerIcon = trackerIcon;
  tracker.trackerImeiNumber = `${trackerImeiNumber}`;
  tracker.trackerIsFavorite = trackerIsFavorite;
  tracker.trackerModelName = trackerModelName;
  tracker.trackerName = trackerName;
  tracker.trackerCode = trackerCode;

  tracker.trackerId = trackerItem._id;
  tracker.trackerUsers = trackerUsers;
  tracker.trackerOdometer = trackerOdometer;
  return tracker;
}
