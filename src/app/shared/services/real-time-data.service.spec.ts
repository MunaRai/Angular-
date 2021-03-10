import { TestBed, inject } from '@angular/core/testing';

import { RealTimeDataService } from '@shared/services/real-time-data.service';

describe('RealTimeDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealTimeDataService]
    });
  });

  it('should be created', inject([RealTimeDataService], (service: RealTimeDataService) => {
    expect(service).toBeTruthy();
  }));
});
