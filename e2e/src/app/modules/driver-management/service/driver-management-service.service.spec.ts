import { TestBed, inject } from '@angular/core/testing';

import { DriverManagementServiceService } from './driver-management-service.service';

describe('DriverManagementServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverManagementServiceService]
    });
  });

  it('should be created', inject([DriverManagementServiceService], (service: DriverManagementServiceService) => {
    expect(service).toBeTruthy();
  }));
});
