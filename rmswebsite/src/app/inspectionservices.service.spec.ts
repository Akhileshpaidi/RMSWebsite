import { TestBed } from '@angular/core/testing';

import { InspectionservicesService } from './inspectionservices.service';

describe('InspectionservicesService', () => {
  let service: InspectionservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
