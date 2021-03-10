import { TestBed, inject } from '@angular/core/testing';

import { CurrentUserService } from '@shared/services/current-user.service';

describe('CurrentUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentUserService]
    });
  });

  it('should be created', inject([CurrentUserService], (service: CurrentUserService) => {
    expect(service).toBeTruthy();
  }));
});
