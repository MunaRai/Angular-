import { Component, OnInit,OnDestroy, Input, HostBinding, HostListener } from '@angular/core';
import { P2S_COLORS } from '@shared/constants/color.constant';
import { CAR_ICON } from '@shared/constants/car-icon.constant';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { PolyLinePoint } from '../history-map/history-map.component';


@Component({
  selector: 'p2s-live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.scss']
})
export class LiveMapComponent implements OnInit {

  // @HostBinding('style.backgroundColor') backgroundColor:string;
  
  // @HostListener(''){
  //   this.backgroundColor='#000';
  // }

  destroyed$: Subject<boolean> = new Subject();
  
  selectedTracker: LiveTracker;

  carIcon = CAR_ICON;

  markerIcon = {
    path: this.carIcon,
    fillColor: 'red',
    fillOpacity: 1,
    scale: 1.1,
    strokeColor: 'red',
    strokeWeight: 1,
    strokeOpacity: .8,
    rotation: 0,
  };

  statusColor = {
    MOVING: P2S_COLORS.GREEN,
    STOPPED: P2S_COLORS.RED,
    IDLE: P2S_COLORS.YELLOW,
    STALLED: P2S_COLORS.BLACK,
  };

  paths: PolyLinePoint[] = [];

  @Input()
  lat = 0;

  @Input()
  lng = 0;

  @Input()
  icon = '';


  constructor(private trackerService: TrackerListService) { }

  ngOnInit() {
    this.getTracker();
  }


  getTracker() {
    this.trackerService.getCurrentTracker()
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(data => {
        if (data) {
          // add current location to the path
          if (this.selectedTracker && this.selectedTracker.trackerId === data.trackerId) {
            this.paths = [...this.paths, { lat: +data.gpsAttributeLat, lng: data.gpsAttributeLng }];
          } else {
            this.paths = [];
          }

          // reflect changes on the map
          this.lat = data.gpsAttributeLat;
          this.lng = data.gpsAttributeLng;
          
          const newIcon = this.updateIcon(data);
          this.markerIcon = {
            ...this.markerIcon,
            ...newIcon
          };
          this.selectedTracker = data;
        }
      });
  }

  updateIcon(trackerData: LiveTracker) {
    const course = +trackerData.gpsAttributeCourse || 0;
    return {
      fillColor: this.statusColor[trackerData.gpsAttributeStatus],
      strokeColor: this.statusColor[trackerData.gpsAttributeStatus],
      rotation: course,
      
    };
  }

}
