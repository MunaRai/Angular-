import { TestBed, inject } from '@angular/core/testing';

import { FullScreenSpinnerService } from '@shared/services/full-screen-spinner.service';

describe('FullScreenSpinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullScreenSpinnerService]
    });
  });

  it('should be created', inject([FullScreenSpinnerService], (service: FullScreenSpinnerService) => {
    expect(service).toBeTruthy();
  }));
});
