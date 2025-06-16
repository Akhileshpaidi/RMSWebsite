import { TestBed } from '@angular/core/testing';

import { DocumentType } from './employees.service';

describe('EmployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentType = TestBed.get(DocumentType);
    expect(service).toBeTruthy();
  });
});
 