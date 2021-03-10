import { TestBed, inject } from '@angular/core/testing';

import { CommodityCodeServiceService } from './commodity-code-service.service';

describe('CommodityCodeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommodityCodeServiceService]
    });
  });

  it('should be created', inject([CommodityCodeServiceService], (service: CommodityCodeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
