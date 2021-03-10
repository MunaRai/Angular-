import { TestBed, inject } from '@angular/core/testing';

import { ExpenseChartService } from './expense-chart.service';

describe('ExpenseChartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseChartService]
    });
  });

  it('should be created', inject([ExpenseChartService], (service: ExpenseChartService) => {
    expect(service).toBeTruthy();
  }));
});
