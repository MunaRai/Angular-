import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  OnDestroy,
} from '@angular/core';
import { CAR_ICON } from '@shared/constants/car-icon.constant';
import { P2S_COLORS } from '@shared/constants/color.constant';
import { PlabybackData } from '@shared/models/playback-data.model';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { Subscription } from 'rxjs/Subscription';
import { LiveTracker } from '@shared/models/live-tracker.model';

@Component({
  selector: 'p2s-history-map',
  templateUrl: './history-map.component.html',
  styleUrls: ['./history-map.component.scss'],
})
export class HistoryMapComponent implements OnInit, OnDestroy {
  history: LiveTracker[] = [];

  currentHistory: LiveTracker;

  carIcon = CAR_ICON;

  icon = {
    path: this.carIcon,
    fillColor: 'transparent',
    fillOpacity: 1,
    scale: 1.1,
    strokeColor: 'transparent',
    strokeWeight: 1,
    strokeOpacity: 0.8,
    rotation: 0,
  };

  lat = 0;

  lng = 0;

  statusColor = {
    MOVING: P2S_COLORS.GREEN,
    STOPPED: P2S_COLORS.RED,
    IDLE: P2S_COLORS.YELLOW,
    STALLED: P2S_COLORS.BLACK,
  };

  paths: PolyLinePoint[] = [];

  subs: Subscription[] = [];

  constructor(private trackerListService: TrackerListService) {}

  ngOnInit() {
    this.fetchHistory();
  }

  fetchHistory() {
    const sub = this.trackerListService.getTrackerHistory().subscribe(data => {
      this.history = data;
      this.fetchCurrentLocation();
      this.setPath();
    });
    this.subs.push(sub);
  }

  fetchCurrentLocation() {
    const sub = this.trackerListService
      .getCurrentTracker()
      .subscribe(tracker => {
        if (tracker) {
          this.lat = tracker.gpsAttributeLat;
          this.lng = tracker.gpsAttributeLng;
          this.currentHistory = tracker;
          this.setLatLng(tracker);
          this.updateIcon(tracker);
        }
      });
    this.subs.push(sub);
  }

  setLatLng(item: LiveTracker) {
    if (item) {
      this.lat = item.gpsAttributeLat;
      this.lng = item.gpsAttributeLng;
    }
  }

  setPath() {
    this.paths = this.history.map(his => ({
      lat: his.gpsAttributeLat,
      lng: his.gpsAttributeLng,
    }));
  }

  updateIcon(trackerData: LiveTracker) {
    if (trackerData) {
      this.icon = Object.assign(
        {},
        this.icon,
        this.getIconObject(
          trackerData.gpsAttributeStatus,
          +trackerData.gpsAttributeCourse
        )
      );
    }
  }

  getIconObject(status, course = 0) {
    return {
      fillColor: this.statusColor[status],
      strokeColor: this.statusColor[status],
      rotation: course,
    };
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
  }
}

export interface PolyLinePoint {
  lat: number;
  lng: number;
}
