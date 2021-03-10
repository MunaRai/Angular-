import { TestBed, inject } from '@angular/core/testing';

import { TrackerListService } from '@shared/services/tracker-list.service';

describe('TrackerListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackerListService]
    });
  });

  it('should be created', inject([TrackerListService], (service: TrackerListService) => {
    expect(service).toBeTruthy();
  }));
});
