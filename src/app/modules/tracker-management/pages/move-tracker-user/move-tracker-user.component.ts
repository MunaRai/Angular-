import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@shared/models/user.model';
import { UserService } from 'app/modules/user-management/services/user.service';
import { TrackerListService } from '@shared/services/tracker-list.service';
import { Tracker } from '@shared/models/tracker.model';

@Component({
  selector: 'p2s-move-tracker-user',
  templateUrl: './move-tracker-user.component.html',
  styleUrls: ['./move-tracker-user.component.scss']
})
export class MoveTrackerUserComponent implements OnInit {

  tracker: Tracker;

  users: User[] = [];

  trackerUsers = [];

  constructor(
    private modal: NgbActiveModal,
    private trackerListService: TrackerListService
  ) { }

  ngOnInit() {
    this.fetchUsersOfIndividual();
  }

  save() {
    this.modal.close(Object.assign({}, this.tracker));
  }

  cancel() {
    this.modal.dismiss();
  }

  fetchUsersOfIndividual() {
    this.trackerListService.getUsersOfDistributor()
      .subscribe(
        data => {
          this.users = data.result;
          this.tracker.trackerUsers.forEach(userId => {
            const foundUser = this.users.find(user => user.userId === userId);
            const idx = this.users.indexOf(foundUser);
            this.users.splice(idx, 1);
          });
        },
        error => {
          console.error('Error is', error);
        }
      );
  }

  hasUser(userId) {
  }

  userChange(userId) {
    if (this.trackerUsers.includes(userId)) {
      const idx = this.trackerUsers.indexOf(userId);
      this.trackerUsers.splice(idx, 1);
    } else {
      this.trackerUsers.push(userId);
    }

    this.tracker.trackerUsers = this.trackerUsers;
  }

}
