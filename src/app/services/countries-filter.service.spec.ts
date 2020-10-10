import { TestBed } from '@angular/core/testing';

import { CountriesFilterService } from './countries-filter.service';

describe('CountriesFilterService', () => {
  let service: CountriesFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
