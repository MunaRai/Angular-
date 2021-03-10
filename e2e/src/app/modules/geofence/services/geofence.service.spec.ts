import { TestBed, inject } from '@angular/core/testing';

import { GeofenceService } from './geofence.service';

describe('GeofenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeofenceService]
    });
  });

  it('should be created', inject([GeofenceService], (service: GeofenceService) => {
    expect(service).toBeTruthy();
  }));
});
