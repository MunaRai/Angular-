import { Injectable } from '@angular/core';
import { User } from '@shared/models/user.model';

@Injectable()
export class CurrentUserService {

  private _user: User;

  constructor() { }

  get user() {
    return this.user;
  }

  set user(user: User) {
    this.user = user;
  }

}
