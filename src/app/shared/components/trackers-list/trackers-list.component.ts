import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TrackerListService, convertTrackerDetails } from '@shared/services/tracker-list.service';
import { RealTimeDataService } from '@shared/services/real-time-data.service';
import { Subscription } from 'rxjs/Subscription';
import { LiveTracker, Information } from '@shared/models/live-tracker.model';
import { Subject } from 'rxjs/Subject';
import { HttpResult } from '@shared/models/http-result.model';
import { WithDestroy } from '@shared/classes/withDestory';
import { takeUntil } from 'rxjs/operators';
import { Notification } from '@shared/models/notification.model';
import { NotificationService } from '../../../modules/dashboard/services/notification.service';
import { Tracker } from '@shared/models/tracker.model';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap/tabset/tabset';
import { NgbModalRef, NgbModal, NgbPopoverConfig } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Reminder } from '@shared/models/reminder.model';
import { ReminderService } from '../../../modules/dashboard/services/reminder.service';
import { NgxSpinnerService } from '@shared/modules/ngx-spinner';
import { ToastService } from '@shared/services/toast.service';
import {
  DeleteConfirmationPopupComponent
} from '@shared/components/delete-confirmation-popup/delete-confirmation-popup.component';
import { User } from '@shared/models/user.model';
import { UserDetailService } from '@shared/services/user-detail.service';
import { Distributor } from '@shared/system-models/distributor.model';
import { RouteInformation } from '@shared/models/route-information.model';
import { Stop } from '@shared/models/stops.model';
import { RouteInformationService } from '@shared/services/route-information.service';

@Component({
  selector: 'p2s-trackers-list',
  templateUrl: './trackers-list.component.html',
  styleUrls: ['./trackers-list.component.scss']
})
export class TrackersListComponent extends WithDestroy implements OnInit {

  @Input()
  mode = 'dashboard';

  @Input()
  showInfoWindow = false;

  users: User[] = [];

  distributors: Distributor[] = [];

  user: User = new User();

  // @Input()
  // reminder: Reminder[] = [];

  trackerList: LiveTracker[] = [];

  @Output()
  select: EventEmitter<any> = new EventEmitter;

  @Output()
  tabChange: EventEmitter<any> = new EventEmitter;

  selectedTracker: LiveTracker;

  @Input()
  currentTracker: Tracker;

  isLoading$: Subject<boolean> = new Subject();

  isError = false;

  moving = 0;

  idle = 0;

  stopped = 0;

  stalled = 0;

  total = 0;

  subscribtion: Subscription[] = [];

  searchTerm = '';

  filterBy = '';

  alarmsLoading = false;

  selectedReminder = Reminder;

  reminderLoading = false;

  infoLoading = false;

  tempTrackerList: Tracker[] = [];

  favTrackerList: any[] = [];

  alarms: Notification[] = [];

  @Input()
  reminder: Reminder[] = [];

  info: Information;

  currentTrackerId: string;

  routeInformation: RouteInformation= new RouteInformation();

  skippedStopsList: any[] = [];

  crossedStopList: any[] = [];

  currentStop: Stop = new Stop();

  nextStop: Stop = new Stop();

  crossedStop: Stop = new Stop();

  currentStopName = '';

  nextStopName = '';

  crossedStopName = '';

  firstStop: Stop = new Stop();

  lastStop: Stop = new Stop();

  onDestory = () => {
    this.liveDataService.disconnect();
    this.routeInfoService.disconnect();

  }

  constructor(
    private dataService: TrackerListService,
    private modal: NgbModal,
    private liveDataService: RealTimeDataService,
    private notificationService: NotificationService,
    private reminderService: ReminderService,
    private spinner: NgxSpinnerService,
    private toaster: ToastService,
    private trackerlistService: TrackerListService,
    private userDetailService: UserDetailService,
    private routeInfoService: RouteInformationService,

    config: NgbPopoverConfig
    
  ) {
    super();
    config.placement = 'right';
    config.triggers = 'hover';
  }

  ngOnInit() {
    this.getUserRole();
    this.fetchData();
    this.getLiveData(); 
    this.getRouteInformation();
  }

  fetchData() {
    
    this.isLoading$.next(true);
    // first fetch the current data using http request
    this.dataService.getTrackersList()
      .pipe(takeUntil(this.destroyed$))
      .finally(() => this.isLoading$.next(false))
      .subscribe(
        // set the values to show in the view
        (data) => {
          if (data) {
            
            this.trackerList = data.result || [];
            this.tempTrackerList = data.result || [];
            this.liveDataService.createConnection();
            if (this.trackerList.length) {
              this.onTrackerSelect(this.trackerList[0]);
              this.selectedTracker = this.trackerList[0];
              this.dataService.setCurrentTracker(this.selectedTracker);
            }
            this.moving = data.meta.movingCount || 0;
            this.idle = data.meta.idleCount || 0;
            this.stopped = data.meta.stoppedCount || 0;
            this.stalled = data.meta.stalledCount || 0;
            this.total = data.meta.totalCount || 0;
          }

          //  then make websocket connection for realtime data
          this.liveDataService.getTrackers()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((changed: HttpResult) => {
              // get a list of changed items
              if (changed.result && changed.result.length) {
                // update available trackers with new data
                this.trackerList = this.trackerList.map(tracker => {
                  const matchedTrackerData = changed.result
                    .find(changedTracker => changedTracker.trackerImeiNumber === tracker.trackerImeiNumber);
                  if (matchedTrackerData) {
                    const convertedTracker = convertTrackerDetails(matchedTrackerData);
                    const updatedTracker = { ...tracker, ...convertedTracker };
                    if (convertedTracker.trackerImeiNumber === this.selectedTracker.trackerImeiNumber) {
                      this.selectedTracker = updatedTracker;
                      this.dataService.setCurrentTracker(this.selectedTracker);
                    }
                    return updatedTracker;
                  }
                  return tracker;
                });
              }

              if (changed.meta) {
                const newMeta = Object.assign({}, changed.meta);
                this.moving = newMeta.movingCount || 0;
                this.idle = newMeta.idleCount || 0;
                this.stopped = newMeta.stoppedCount || 0;
                this.stalled = newMeta.stalledCount || 0;
                this.total = newMeta.totalCount || 0;
              }
            });
        },

        err => {
          console.error(err);
          this.isError = true;
        }
      );
  }

  onTrackerSelect(tracker: any): void {
    this.selectedTracker = tracker;
    this.dataService.setCurrentTracker(tracker);
    this.select.emit(tracker);
  }

  convertToDate(dateTime: string) {
    if (!dateTime) {
      return new Date().getTime();
    }
    const split = dateTime.split(' on');
    const day = split[0];
    const month = split[1];
    const date = split[2];
    const time = split[3];
    const yyyy = split.slice(-1)[0];

    return new Date(`${month} ${date}, ${yyyy} ${time}`).getTime();
  }

  onTabChange(evt: NgbTabChangeEvent) {
    this.tabChange.emit(evt.nextId);

    // if nextId is alarm, fetch alarm list for selected tracker
    if (evt.nextId === 'alarm') {
      this.alarmsLoading = true;
      this.notificationService.getTrackerAlarms(this.selectedTracker.trackerId)
        .pipe(takeUntil(this.destroyed$))
        .finally(() => this.alarmsLoading = false)
        .subscribe(({ result }) => {
          this.alarms = result;
        });
    }
    // if (evt.nextId === 'reminder') {
    //   this.reminderLoading = true;
    //   this.reminderService.getTrackerReminder(this.selectedTracker.trackerId)
    //     .pipe(takeUntil(this.destroyed$))
    //     .finally(() => this.reminderLoading = false)
    //     .subscribe(({ result }) => {
    //       this.reminder = result;
    //     });
    // }

    if (evt.nextId === 'info') {
      this.infoLoading = true;
      this.dataService.getTrackersInfo(this.selectedTracker.trackerId)
        .pipe(takeUntil(this.destroyed$))
        .finally(() => this.infoLoading = false)
        .subscribe(({ result }) => {
          this.info = result;
        });
    }
  }

  // this functions  is use to update the istrackerFav field as true or false
  setAsFavourite(tracker, event) {

    if (this.user.favouriteTrackers.includes(tracker.trackerId)) {
      tracker.trackerIsFavorite = false;
    } else {
      tracker.trackerIsFavorite = true;
    }

    this.dataService.updateTrackerIsFavourite(tracker.trackerId, tracker.trackerIsFavorite)
      .subscribe(
        data => {
          this.user = data.result;
          // this.getUserRole();
        },
        error => {
        }
      );
    event.stopPropagation();
  }

  // showManageReminder(evt, mode): void {
  //   const modal: NgbModalRef = this.modal.open(GenerateReminderPopupComponent, { size: 'lg' });
  //   modal.componentInstance.mode = mode;
  //   modal.result.then(
  //     data => {
  //       this.spinner.show();
  //       this.reminderService.createReminder(data, this.selectedTracker.trackerId)
  //         .finally(() => this.spinner.hide())
  //         .subscribe(
  //           res => {
  //             this.toaster.popSucces('Reminder added.');
  //             this.reminder.unshift(res.result);
  //           },
  //           err => {
  //             this.toaster.popError('Error adding reminder');
  //           }
  //         );
  //     },
  //     cancel => { }
  //   );
  // }

  // onDelete(){
  //   const modal: NgbModalRef = this.modal.open(DeleteConfirmationPopupComponent);
  //   modal.result.then(
  //     yes => {
  //       this.spinner.show();
  //       const idx = this.reminder.indexOf(this.selectedReminder);
  //       const sub = this.reminderService.deleteReminder(this.selectedReminder.reminderId)
  //         .subscribe(
  //           res => {
  //             this.spinner.hide();
  //             if (res.code === 200) {
  //               this.reminder[idx] = res.result;
  //               this.toaster.popSucces('Reminder removed.');
  //               this.reminder.splice(idx, 1);
  //               sub.unsubscribe();
  //             }
  //           },
  //           err => {
  //             this.spinner.hide();
  //             this.toaster.popError('Error removing the reminder.');
  //             sub.unsubscribe();
  //           }
  //         );

  //     },
  //     no => { }
  //   );
  // }

  fetchAllUsersOfDistributor() {
    this.trackerlistService.getUsersOfDistributor()
      .subscribe(
        data => {
          this.users = data.result;
        },
        error => {
          console.error('error fetching users', error);
        }
      );
  }

  fetchAllDistributorsOfSystem() {
    this.trackerlistService.getDistributorsOfSystem()
      .subscribe(
        data => {
          this.distributors = data.result;
        },
        error => {
          console.error('error fetching distributors', error);
        }
      );
  }

  getUserRole() {
    this.userDetailService.fetchUser()
      .subscribe(
        data => {
          this.user = data.result;
          this.getLiveData()
          
        }
      );

      
  }

  getFilteredTrackersAdmin() {
    return this.trackerList.filter((tracker) => tracker.trackerUsers.includes(this.user.userId));
  }

  findUsersAndTrackers(distributor) {
    // close other distributor if one is opened
    this.distributors.forEach(dist => {
      if(dist.distributorId !=distributor.distributorId){
        dist.showDistributorList = false;
      }
      
    });
    //close other distributor if one is opened

    const userList: User[] = [];
    distributor.clientId.forEach(clientId => {
      const user = this.users.find(usr => usr.userId === clientId);
      if(user) {
        userList.push(user);
      }else {
        console.error('user doesnot exist' , clientId);
      }
      
    });
    distributor.userDtoList = userList;
  }


  //close other users if one is opened
  closeOtherUser(user){
    this.users.forEach(usr => {
      if(usr.userId!= user.userId){
          usr.showTrackerList =false;
      }
      
    });
  }
   //close other users if one is opened

  toggleWithGreeting(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }

  getLiveData(){
    switch(this.user.userRole){
      case 'ROLE_SYSTEM':{
        this.fetchAllDistributorsOfSystem();
        this.fetchAllUsersOfDistributor();

        break;
      }
      case 'ROLE_ADMIN':{
        this.fetchAllUsersOfDistributor();
      break;
      }

      default:{}
      

    }
  }

  getRouteInformation(){
    this.routeInfoService.createConnectionForRoute();
    this.routeInfoService.getRouteInfo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        data => {
          const updateRouteInfo = { ...this.routeInformation, ...data };

          //setting the route information for route map
          this.routeInfoService.setRouteInformation(updateRouteInfo);

          this.firstStop = updateRouteInfo.stops[0];

          this.lastStop = updateRouteInfo.stops[updateRouteInfo.stops.length - 1];
          this.skippedStopsList = updateRouteInfo.stops.filter(stop => stop.stopStatus === 'skipped');
          this.crossedStopList = updateRouteInfo.stops.filter(stop => stop.stopStatus === 'cross');

          if (updateRouteInfo.routeDirection === 'forward') {
            this.currentStop = this.crossedStopList[this.crossedStopList.length - 1];

            if (this.currentStop.position === this.lastStop.position) {
              // this.nextStopName = 'Is in last stop';
              this.nextStop.stopName = 'Is in last stop';
            } else {
              this.nextStop = updateRouteInfo.stops.find(stop => stop.position === (this.currentStop.position) + 1);
              // this.nextStopName = this.nextStop.stopName;
            }

            const currentStopIndex = this.crossedStopList.indexOf(this.currentStop);
            this.crossedStop = this.crossedStopList[currentStopIndex - 1];

          } else if (updateRouteInfo.routeDirection === 'backward') {
            this.currentStop = this.crossedStopList[0];
            if (this.currentStop.position === this.firstStop.position) {
              // this.nextStopName = 'Is in first stop';
              this.nextStop.stopName = 'Is in first stop';
            } else {
              this.nextStop = updateRouteInfo.stops.find(stop => stop.position === (this.currentStop.position) - 1);
              // this.nextStopName = this.nextStop.stopName;
            }

            const currentStopIndex = this.crossedStopList.indexOf(this.currentStop);
            this.crossedStop = this.crossedStopList[currentStopIndex + 1];
          } else {
            this.nextStop.stopName = '';
            this.crossedStop.stopName = '';
            this.currentStop = this.crossedStopList[0] || new Stop();
          }
        },
        error =>{
          // console.error('error fetching ws data for route',error);
        }
      );
  }

}

