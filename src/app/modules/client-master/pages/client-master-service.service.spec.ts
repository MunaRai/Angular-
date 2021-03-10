import { TestBed, inject } from '@angular/core/testing';

import { ClientMasterServiceService } from './client-master-service.service';

describe('ClientMasterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientMasterServiceService]
    });
  });

  it('should be created', inject([ClientMasterServiceService], (service: ClientMasterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
