import { TestBed, inject } from '@angular/core/testing';

import { LicenseLogsService } from './license-logs.service';

describe('LicenseLogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LicenseLogsService]
    });
  });

  it('should be created', inject([LicenseLogsService], (service: LicenseLogsService) => {
    expect(service).toBeTruthy();
  }));
});
