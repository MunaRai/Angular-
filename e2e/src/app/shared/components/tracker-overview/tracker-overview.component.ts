import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { P2S_COLORS } from '@shared/constants/color.constant';
import { CAR_ICON } from '@shared/constants/car-icon.constant';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { PolyLinePoint } from '../../../modules/live-tracking/pages/live-tracking/history-map/history-map.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OdometerPopupComponent } from 'app/modules/home/shared/components/odometer-popup/odometer-popup.component';
import { UserDetailService } from '@shared/services/user-detail.service';
import { User } from '@shared/models/user.model';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'p2s-tracker-overview',
  templateUrl: './tracker-overview.component.html',
  styleUrls: ['./tracker-overview.component.scss'],
})
export class TrackerOverviewComponent implements OnInit, OnDestroy {
  user: User = new User();

  destroyed$: Subject<boolean> = new Subject();

  isPanelOpen = true;

  time: Date = new Date();

  selectedTracker: LiveTracker;

  lat = 0;

  lng = 0;

  coordinates: { lat: number; lng: number } = { lat: 0, lng: 0 };

  @Input()
  mode = 'dashboard';

  carIcon = CAR_ICON;

  markerIcon = {
    path: this.carIcon,
    fillColor: 'red',
    fillOpacity: 1,
    scale: 0.6,
    strokeColor: 'red',
    strokeWeight: 1,
    strokeOpacity: 0.8,
    rotation: 0,
  };

  statusColor = {
    MOVING: P2S_COLORS.GREEN,
    STOPPED: P2S_COLORS.RED,
    IDLE: P2S_COLORS.YELLOW,
    STALLED: P2S_COLORS.BLACK,
  };

  paths: PolyLinePoint[] = [];

  snappedPaths: PolyLinePoint[] = [];

  snapToRoadSub: Subscription;

  constructor(
    private trackerService: TrackerListService,
    private modal: NgbModal,
    private userDetailService: UserDetailService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getTracker();
  }

  getTracker() {
    this.trackerService
      .getCurrentTracker()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        if (data) {
          // add current location to the path
          if (
            this.selectedTracker &&
            this.selectedTracker.trackerId === data.trackerId
          ) {
            this.paths = [
              ...this.paths,
              { lat: +data.gpsAttributeLat, lng: data.gpsAttributeLng },
            ];
          } else {
            this.paths = [];
            this.snappedPaths = [];
            this.lat = +data.gpsAttributeLat;
            this.lng = +data.gpsAttributeLng;
          }
          if (this.paths.length) {
            this.snapToRoad();
          }

          const newIcon = this.updateIcon(data);
          this.markerIcon = {
            ...this.markerIcon,
            ...newIcon,
          };
          this.selectedTracker = data;
        }
      });
  }

  snapToRoad() {
    if (this.snapToRoadSub) {
      this.snapToRoadSub.unsubscribe();
    }
    this.snapToRoadSub = this.trackerService
      .snapToRoad(this.paths)
      .pipe(
        takeUntil(this.destroyed$),
        map(res => res.snappedPoints.slice(-1)[0])
      )
      .subscribe(res => {
        this.snappedPaths = [
          ...this.snappedPaths,
          {
            lat: res.location.latitude,
            lng: res.location.longitude,
          },
        ];
        this.lat = res.location.latitude;
        this.lng = res.location.longitude;
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

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  setOdometerPopUp(selectedTracker) {
    const modal: NgbModalRef = this.modal.open(OdometerPopupComponent, {
      size: 'lg',
    });
    modal.componentInstance.tracker = selectedTracker;
  }

  getCurrentUser() {
    this.userDetailService.fetchUser().subscribe(
      data => {
        this.user = data.result;
      },
      error => {
        console.error('Error while fetching logged in user', error);
      }
    );
  }
}
