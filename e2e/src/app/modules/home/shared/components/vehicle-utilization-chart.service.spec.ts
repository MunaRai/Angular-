import { TestBed, inject } from '@angular/core/testing';

import { VehicleUtilizationChartService } from './vehicle-utilization-chart.service';

describe('VehicleUtilizationChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleUtilizationChartService]
    });
  });

  it('should be created', inject([VehicleUtilizationChartService], (service: VehicleUtilizationChartService) => {
    expect(service).toBeTruthy();
  }));
});
