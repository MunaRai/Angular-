import { Component, OnInit, Input } from '@angular/core';
import { Tracker } from '../../../models/tracker.model';
import { Subject } from 'rxjs/Subject';
import { WithDestroy } from '@shared/classes/withDestory';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap/accordion/accordion';
import { PaginationResult } from '@shared/models/pagination-result.model';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { takeUntil } from '../../../../../../../node_modules/rxjs/operators';
import { RealTimeDataService } from '@shared/services/real-time-data.service';
import { HttpResult } from '@shared/models/http-result.model';



@Component({
  selector: 'p2s-trackers-summary',
  templateUrl: './trackers-summary.component.html',
  styleUrls: ['./trackers-summary.component.scss']
})
export class TrackersSummaryComponent implements OnInit {

  @Input()
  trackers: Tracker[] = [];

  selectedTracker: LiveTracker;

  @Input()
  currentTracker: Tracker;

  
  trackerList: LiveTracker[] = [];

  isLoading$: Subject<boolean> = new Subject();

  isError = false;
  isPanelOpen = true;
  trackerCount = 0;
  moving = 0;

  idle = 0;

  stopped = 0;

  stalled = 0;

  total = 0;
  pagingSorting: PaginationResult = new PaginationResult();


  constructor(
    private liveDataService: RealTimeDataService,
    private dataService: TrackerListService
  ) { }

  ngOnInit() {
    this.trackerDetailCount();
  }
   
  trackerDetailCount() {
    this.isLoading$.next(true);
    // first fetch the current data using http request
    this.dataService.getTrackersList()
      .finally(() => this.isLoading$.next(false))
      .subscribe(
        // set the values to show in the view
        (data) => {
          if (data) {
            this.trackerList = data.result || [];
            this.liveDataService.createConnection();
            this.moving = data.meta.movingCount || 0;
            this.idle = data.meta.idleCount || 0;
            this.stopped = data.meta.stoppedCount || 0;
            this.stalled = data.meta.stalledCount || 0;
            this.total = data.meta.totalCount || 0;
          }

          
        },

      );
  }


  }


  
