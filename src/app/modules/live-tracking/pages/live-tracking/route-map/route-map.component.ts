import { Component, OnInit, Input } from '@angular/core';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { MAP_ICON } from '@shared/constants/map-icon.constant';
import { CAR_ICON } from '@shared/constants/car-icon.constant';
import { P2S_COLORS } from '@shared/constants/color.constant';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { RouteInformationService } from '@shared/services/route-information.service';

@Component({
  selector: 'p2s-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit {

  @Input()
  lat = 0;

  @Input()
  lng = 0;

  @Input()
  icon = '';

  stopLastCount: 0;

  selectedTracker: LiveTracker = new LiveTracker();

  routeInformation: any = {};

  stopList: any = [];

  mapIcon = MAP_ICON;

  carIcon = CAR_ICON;

  optionsRed = {
    markerOptions: {
      suppressMarkers: true,
      icon: 'assets/img/no'
    },
    polylineOptions: {
      strokeColor: 'purple'
    }
  };

  markerIcon = {
    url: 'assets/img/pin-red.png',
    fillColor: 'red',
    fillOpacity: 1,
    scale: 1.1,
    strokeColor: 'black',
    strokeWeight: 1,
    strokeOpacity: .8,
    rotation: 0,
    scaledSize: {
      width: 30,
      height: 30
    },
  };

  markerCarIcon = {
    url: 'assets/img/icon-car__moving.png',
    fillColor: 'red',
    fillOpacity: 1,
    scale: 1.1,
    strokeColor: 'white',
    strokeWeight: 1,
    strokeOpacity: .8,
    rotation: 0,
    scaledSize: {
      width: 20,
      height: 38
    }
  };

  markerColor = {
    cross: P2S_COLORS.GREEN,
    skipped: P2S_COLORS.BLUE,
    pending: P2S_COLORS.RED,
  };

  statusColor = {
    MOVING: P2S_COLORS.GREEN,
    STOPPED: P2S_COLORS.RED,
    IDLE: P2S_COLORS.YELLOW,
    STALLED: P2S_COLORS.BLACK,
  };

  constructor(
    private trackerService: TrackerListService,
    private routeInfoService: RouteInformationService
  ) {}


  ngOnInit() {
    this.getTracker();
    this.getStopsOfSelectedTracker(this.selectedTracker.trackerId);
    this.fetchRouteInformationOfTracker();
  }

  getTracker() {
    this.trackerService.getCurrentTracker()
      .subscribe(data => {
        if (data) {
          this.lat = data.gpsAttributeLat;
          this.lng = data.gpsAttributeLng;

          this.selectedTracker = data;
        }
      });
  }

  getStopsOfSelectedTracker(trackerId) {
    this.trackerService.getStopsOfSelectedTracker(trackerId)
      .subscribe(
        data => {
          this.stopList = data.result.stops;
          this.stopLastCount = this.stopList.length;
        }
      );
  }


  fetchRouteInformationOfTracker() {
    this.routeInfoService
      .getRouteInformation()
      .subscribe(data => {
        if (data) {
          const updatedRouteInformation = {...this.routeInformation, ...data};

          if (updatedRouteInformation.stops == null) {
            this.stopList.map(stop => stop.markerIcon = this.markerIcon);
          } else {
            this.stopList.forEach(stop => {
              const updatedStop = updatedRouteInformation.stops.find(routeStop => routeStop.position === stop.position);
              const newMarkerIcon = this.updateMarkerIcon(updatedStop);
              stop.markerIcon = {
                ...this.markerIcon,
                ...newMarkerIcon
              };
            });
          }
        }
      });
  }

  updateMarkerIcon(stop: any) {
    let changedUrl = '';
    if (stop.stopStatus === 'cross') {
      changedUrl = 'assets/img/pin-green.png';
    } else if (stop.stopStatus === 'skipped') {
      changedUrl = 'assets/img/pin-blue.png';
    } else {
      changedUrl = 'assets/img/pin-red.png';
    }

    const course = +this.selectedTracker.gpsAttributeCourse || 0;
    return {
      url: changedUrl,
      fillColor: this.markerColor[stop.stopStatus],
      strokeColor: this.markerColor[stop.stopStatus],
      rotation: course
    };
  }

  updateCarIcon(trackerData: LiveTracker) {
    const course = +trackerData.gpsAttributeCourse || 0;
    return {
      fillColor: this.statusColor[trackerData.gpsAttributeStatus],
      strokeColor: this.statusColor[trackerData.gpsAttributeStatus],
      rotation: course
    };
  }
}
