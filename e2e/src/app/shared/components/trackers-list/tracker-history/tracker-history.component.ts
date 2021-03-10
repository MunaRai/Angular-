import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { format, startOfDay, subDays, endOfDay, addMinutes, addHours, getMilliseconds } from 'date-fns';
import { Subscription } from 'rxjs/Subscription';
import { TrackerListService } from '@shared/services/tracker-list.service';
import 'rxjs/add/operator/finally';
import { PlabybackData } from '@shared/models/playback-data.model';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { PaginationResult } from '@shared/models/pagination-result.model';
@Component({
  selector: 'p2s-tracker-history',
  templateUrl: './tracker-history.component.html',
  styleUrls: ['./tracker-history.component.scss']
})
export class TrackerHistoryComponent implements OnInit, OnDestroy {

  @Input()
  trackerId: string;

  now = new Date();
  year = this.now.getFullYear();
  month = this.now.getMonth();
  day = this.now.getDay();
  minDate = { year: this.year, month: this.month, day: this.day -3 };
  
  status = 'stopped';

  speed = 1;

  history: LiveTracker[] = [];

  historyForm: FormGroup;

  showCustomFields = false;

  loadingData = false;

  subscriptions: Subscription[] = [];

  formSubmitted = false;

  paginationResult =[];

  @Output()
  fetchedHistory: EventEmitter<any> = new EventEmitter();

  playbackIndex = 0;

  playbackInterval: any;
  
  trackerName: string;
  distance = 0;
  parkingTime = new Date();
  parkingSize =0;
  fromD = new Date();
  toD = new Date();
  constructor(
    private fb: FormBuilder,
    private trackerService: TrackerListService
  ) { }

  ngOnInit() {
    this.buildForm();
    // this.getMeta();

    const sub = this.historyForm.valueChanges
      .subscribe(data => {
        this.showCustomFields = data.duration === 'custom';
      });
    this.subscriptions.push(sub);
  }

  buildForm() {
    this.historyForm = this.fb.group({
      duration: 'today',
      fromDate: [null, [Validators.required]],
      fromTime: [{ hour: 0, minute: 0, second: 0 }, [Validators.required]],
      toDate: [null, [Validators.required]],
      toTime: [{ hour: 24, minute: 59, second: 0 }, [Validators.required]]
    });
  }

  showHistory() {
    this.formSubmitted = true;
    let from = startOfDay(new Date());
    let to = new Date();
    this.fromD = from;
    this.toD = to;
    switch (this.historyForm.controls.duration.value) {
      case 'today':
        this.fetchTrackerHistory(from, to);
        this.getMeta(from, to);
        break;
      case 'yesterday':
        from = subDays(from, 1);
        to = subDays(from, -1);
        this.fetchTrackerHistory(from, to);
        this.getMeta(from, to);
        this.fromD = from;
        break;
      default:
        from = this.historyForm.controls['fromDate'].value;
        to = this.historyForm.controls['toDate'].value;
        const fromTime = this.historyForm.controls.fromTime.value;
        const toTime = this.historyForm.controls.toTime.value;
        if (this.historyForm.valid) {
          from = this.addTime(from, fromTime);
          to = this.addTime(to, toTime);
          this.fetchTrackerHistory(from, to);
          this.getMeta(from,to);
        }
    }
  }

  addTime(date, time) {
    let modifiedDate = startOfDay(date);
    modifiedDate = addHours(modifiedDate, time.hour);
    modifiedDate = addMinutes(modifiedDate, time.minute);
    return modifiedDate;
  }

  fetchTrackerHistory(from = startOfDay(new Date()), to = new Date()) {
    const formattedFrom = format(from, 'YYYY-MM-DD HH:mm:ss');
    const formattedTo = format(to, 'YYYY-MM-DD HH:mm:ss');
    this.loadingData = true;
    this.trackerService.fetchTrackerHistory(this.trackerId, from.valueOf(), to.valueOf(),)
      .finally(() => this.loadingData = false)
      .subscribe(
        data => {
          this.history = data;
        },
        err => {
        }
      );
  }
  getMeta(from = startOfDay(new Date()), to = new Date()) {
    this.loadingData = true;
    this.trackerService.getMeta(this.trackerId, from.valueOf(), to.valueOf())
    .finally(() => this.loadingData = false)
    .subscribe(
      ({ paginationResult,  }) => {
       this.paginationResult = paginationResult;
       this.trackerName = paginationResult[1];
       this.distance = paginationResult[2];
       this.parkingSize = paginationResult[3];
       this.parkingTime = paginationResult[4];

      }
    )
  }

  ngOnDestroy() {
    this.subscriptions.map(sub => sub.unsubscribe());
  }


  get fromDate() {
    return this.historyForm.controls.fromDate;
  }

  get toDate() {
    return this.historyForm.controls.toDate;
  }

  togglePlay() {
    this.status = this.status === 'play' ? 'pause' : 'play';
    this.runPlayback();
  }

  runPlayback() {
    switch (this.status) {
      case 'play':
        this.onPlay();
        break;
      case 'pause':
        this.onPause();
        break;
      default:
        this.onStop();
        break;
    }
  }

  onPlay() {
    this.playbackInterval = setInterval(() => {
      this.trackerService.setCurrentTracker(this.history[this.playbackIndex]);
      ++this.playbackIndex;
      if (this.playbackIndex === this.history.length - 1 ) {
        this.onStop();
      }
    }, this.speed * 1000);
  }

  onPause() {
    this.status = 'pause';
    clearInterval(this.playbackInterval);
  }

  onStop() {
    this.playbackIndex = 0;
    clearInterval(this.playbackInterval);
    this.status = 'stop';
    this.trackerService.setCurrentTracker(this.history[0]);
  }

}
