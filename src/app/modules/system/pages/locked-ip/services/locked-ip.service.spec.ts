import { TestBed, inject } from '@angular/core/testing';

import { LockedIpService } from './locked-ip.service';

describe('LockedIpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LockedIpService]
    });
  });

  it('should be created', inject([LockedIpService], (service: LockedIpService) => {
    expect(service).toBeTruthy();
  }));
});
