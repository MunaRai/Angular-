import { TestBed, inject } from '@angular/core/testing';

import { ApiUrlInterceptorService } from '@shared/services/api-url-interceptor.service';

describe('ApiUrlInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUrlInterceptorService]
    });
  });

  it('should be created', inject([ApiUrlInterceptorService], (service: ApiUrlInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
