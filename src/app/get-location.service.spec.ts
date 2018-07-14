import { TestBed, inject } from '@angular/core/testing';

import { GetLocationService } from './get-location.service';

describe('GetLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetLocationService]
    });
  });

  it('should be created', inject([GetLocationService], (service: GetLocationService) => {
    expect(service).toBeTruthy();
  }));
});
