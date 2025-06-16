import { TestBed } from '@angular/core/testing';

import { EComplianceDataService } from './e-compliance-data.service';

describe('EComplianceDataService', () => {
  let service: EComplianceDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EComplianceDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
