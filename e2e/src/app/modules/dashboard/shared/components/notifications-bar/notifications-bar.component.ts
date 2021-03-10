import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification } from '@shared/models/notification.model';
import { NotificationService } from '../../../services/notification.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'p2s-notifications-bar',
  templateUrl: './notifications-bar.component.html',
  styleUrls: ['./notifications-bar.component.scss']
})
export class NotificationsBarComponent implements OnInit, OnDestroy {

  notifications: Notification[];
  notificationCount: Observable<number>;
  subs: Subscription[] = [];

  loading: Observable<boolean>;
  date = new Date();
  private unseenCount = 0;

  count=0;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getNotifications();
    this.fetchNotificationCount();
    this.loading = this.notificationService.getLoading();
  }

  getNotifications() {
    this.subs.push(this.notificationService.getNotifications()
      .subscribe(notifications => {
        this.notifications = notifications;
      }));
    this.notificationCount = this.notificationService.getNotificationsCount();
  }

  markAllAsSeen() {
    this.notificationService.markAllAsSeen();
    // this.notificationCount.isEmpty;
    this.count = 0;
  }

  markThisAsSeen(id: string, idx: number) {
    // this.notifications[idx].isSeen = true;
    const sub = this.notificationService.markCurrentAsSeen(id)
      .subscribe(res => {
        // this.notifications[idx].isSeen = res.resut;
        this.notifications[idx].isSeen = true;
        this.count= this.count-1;
        // sub.unsubscribe();
      });
  }

  loadMoreNotifications(): void {
    this.notificationService.getMoreNotifications(this.notifications.length);
  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe());
    this.notificationService.unsub();
  }


  //testing purpose
  fetchNotificationCount() {
    this.notificationService.fetchCount()
      .subscribe(
        data => {
          console.log('the count is ' , data.meta);
          
          this.count = data.meta
        }
      )
  }
}
