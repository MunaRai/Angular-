import { Component, OnInit, Input } from '@angular/core';
import { TrackerService } from 'app/modules/tracker-management/services/tracker.service';
import { Tracker } from '@shared/models/tracker.model';
import { Route } from '@shared/models/route.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouteService } from '../../services/route.service';
import { TrackerRoutes } from '@shared/models/trackerRoutes.model';

@Component({
  selector: 'p2s-assign-tracker-popup',
  templateUrl: './assign-tracker-popup.component.html',
  styleUrls: ['./assign-tracker-popup.component.scss'],
})
export class AssignTrackerPopupComponent implements OnInit {
  // @Input()
  trackerRoutes: TrackerRoutes;

  route: Route;

  title = '';

  trackerIds: string[] = [];

  trackerList: Tracker[] = [];

  tempTrackerRouteList: any[] = [];

  trackerRoutesList: TrackerRoutes[] = [];

  trackersRoutes: TrackerRoutes[] = [];

  constructor(
    private trackerService: TrackerService,
    private modal: NgbActiveModal,
    private routeService: RouteService
  ) {}

  ngOnInit() {
    this.fetchTrackerRoutes();
    this.fetchTracker();
    this.title = this.route.routeName;
  }

  fetchTracker() {
    this.routeService.getTrackers(this.route.routeName).subscribe(
      data => {
        this.trackerList = data.result;
      },
      error => {
        console.error('error fetching tracker on route', error);
      }
    );
  }

  addTrackerToRoute(tracker) {
    // const trackerRoute = new TrackerRoutes();
    if (!this.trackerRoutes.trackerIds.includes(tracker.trackerId)) {
      this.trackerRoutes.routeName = this.route.routeName;
      this.trackerRoutes.trackerIds.push(tracker.trackerId);
    } else {
      const idx = this.trackerRoutes.trackerIds.indexOf(tracker.trackerId);
      this.trackerRoutes.trackerIds.splice(idx, 1);
    }
  }

  save() {
    this.modal.close(Object.assign({}, this.trackerRoutes));
    console.log('the tracker routes after editing is', this.trackerRoutes);
    
  }

  cancel() {
    this.modal.dismiss();
  }

  fetchTrackerRoutes() {
    this.routeService.getTrackerRoutes().subscribe(data => {
      this.trackerRoutes =
        data.result.find(
          trackerRoute => trackerRoute.routeName === this.route.routeName
        ) || new TrackerRoutes();
    });
  }

  hasTracker(id) {
    return (
      this.trackerRoutes.trackerIds &&
      this.trackerRoutes.trackerIds.find(trackerid => trackerid === id)
    );
  }
}
