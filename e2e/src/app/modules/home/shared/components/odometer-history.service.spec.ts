import { TestBed, inject } from '@angular/core/testing';

import { OdometerHistoryService } from './odometer-history.service';

describe('OdometerHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdometerHistoryService]
    });
  });

  it('should be created', inject([OdometerHistoryService], (service: OdometerHistoryService) => {
    expect(service).toBeTruthy();
  }));
});
