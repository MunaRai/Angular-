import { Pipe, PipeTransform } from '@angular/core';
import { LiveTracker } from '@shared/models/live-tracker.model';
import { UserDetailService } from '@shared/services/user-detail.service';

@Pipe({
  name: 'trackerFilter'
})


export class TrackerFilterPipe implements PipeTransform {

  constructor(
    private userDetailService: UserDetailService
  ){}
  
  transform(trackers: LiveTracker[], searchTerm = '', filterBy = ''): any {
    if (searchTerm && !filterBy) {
      return this.searchOnly(trackers, searchTerm);
    }

    if (!searchTerm && filterBy) {
      return this.filterOnly(trackers, filterBy);
    }

    return this.searchOnly(this.filterOnly(trackers, filterBy), searchTerm);
  }

  private searchOnly(trackers: LiveTracker[], term = '') {
    return trackers.filter(tracker => {
      const regex = new RegExp(term, 'gi');
      return regex.test(tracker.trackerName) || regex.test(tracker.trackerImeiNumber);
    });
  }

  private filterOnly(trackers: LiveTracker[], filterBy = '') {
    if (filterBy) {
      if (filterBy === 'favorites') {
        trackers = this.fetchFavoriteTrackers(trackers);
        return trackers;  
      }
      return trackers.filter(tracker => tracker.gpsAttributeStatus === filterBy.toUpperCase());
    }
    return trackers;
  }


  fetchFavoriteTrackers(trackers) {
    let favTrackerList =[];
    this.userDetailService.fetchUser()
    .subscribe(
      data =>{
        data.result.favouriteTrackers.forEach(favTrackerId => {
          const Tracker = trackers.find( tracker => tracker.trackerId === favTrackerId)
          favTrackerList.push(Tracker);
      });
    });  
    return favTrackerList;  
  }
      
}
