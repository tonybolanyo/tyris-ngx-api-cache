import { TestBed } from '@angular/core/testing';

import { ApiCacheService } from './api-cache.service';

describe('NgxApiCacheService', () => {
  let service: ApiCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
