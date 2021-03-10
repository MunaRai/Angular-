import { TestBed, inject } from '@angular/core/testing';

import { OrderAssignService } from './order-assign.service';

describe('OrderAssignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderAssignService]
    });
  });

  it('should be created', inject([OrderAssignService], (service: OrderAssignService) => {
    expect(service).toBeTruthy();
  }));
});
