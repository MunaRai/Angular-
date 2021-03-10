import { TestBed, inject } from '@angular/core/testing';

import { VehiclePerformanceChartService } from './vehicle-performance-chart.service';

describe('VehiclePerformanceChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclePerformanceChartService]
    });
  });

  it('should be created', inject([VehiclePerformanceChartService], (service: VehiclePerformanceChartService) => {
    expect(service).toBeTruthy();
  }));
});
