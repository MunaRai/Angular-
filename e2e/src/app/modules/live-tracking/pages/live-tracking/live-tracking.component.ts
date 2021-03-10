import { Component, OnInit, HostBinding, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';
import { FullScreenSpinnerService } from '@shared/services/full-screen-spinner.service';
import { Tracker } from '@shared/models/tracker.model';
import { CAR_ICON } from '@shared/constants/car-icon.constant';
import { P2S_COLORS } from '@shared/constants/color.constant';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { TrackerHistory } from '@shared/models/tracker-history.model';
import { PlabybackData } from '@shared/models/playback-data.model';
import { TrackerListService } from '@shared/services/tracker-list.service';

@Component({
  selector: 'p2s-live-tracking',
  templateUrl: './live-tracking.component.html',
  styleUrls: ['./live-tracking.component.scss']
})
export class LiveTrackingComponent implements OnInit, OnChanges {

  @HostBinding('class')
  class = 'col p-0 d-flex flex-column';

  selectedTracker: LiveTracker;

  lat = 0;
  lng = 0;

  paths = [];

  carIcon = CAR_ICON;

  statusColor = {
    MOVING: P2S_COLORS.GREEN,
    STOPPED: P2S_COLORS.RED,
    IDLE: P2S_COLORS.YELLOW,
    STALLED: P2S_COLORS.BLACK,
  };

  markerIcon = {
    path: this.carIcon,
    fillColor: 'transparent',
    fillOpacity: 1,
    scale: 1.1,
    strokeColor: 'transparent',
    strokeWeight: 1,
    strokeOpacity: .8,
    rotation: 0,
  };

  mode = 'live';

  constructor(
    private dataService: TrackerListService,
  ) { }

  ngOnInit() {
    this.lat = this.selectedTracker && this.selectedTracker.gpsAttributeLat ? this.selectedTracker.gpsAttributeLat : 0;
    this.lng = this.selectedTracker && this.selectedTracker.gpsAttributeLng ? this.selectedTracker.gpsAttributeLng : 0;
  }

  ngOnChanges(changes) {
    if (changes['selectedTracker'] && changes['selectedTracker'].currentValue) {
      const newValue = changes['selectedTracker'].currentValue;
    }
  }

  onTrackerSelect(tracker) {
    this.selectedTracker = JSON.parse(JSON.stringify(tracker));
    this.lat = tracker.gpsAttributeLat;
    this.lng = tracker.gpsAttributeLng;
    this.markerIcon = Object.assign({}, this.markerIcon, this.updateIcon(tracker));
  }


  updateIcon(trackerData: LiveTracker) {
    if (trackerData) {
      return {
        fillColor: this.statusColor[trackerData.gpsAttributeStatus],
        strokeColor: this.statusColor[trackerData.gpsAttributeStatus],
        rotation: +trackerData.gpsAttributeCourse || 0
      };
    }
    return '';
  }

  tabChange(currentTab) {
    // this.mode = currentTab === 'history-tab' ? 'history' : 'live';
    if(currentTab === 'history-tab'){
      this.mode = 'history';
    }
    else if(currentTab === 'route'){
      this.mode = 'route';
    }
    else{
      this.mode='live';
    }
  }
}
