import { TestBed } from '@angular/core/testing';

import { ConduceService } from './conduce.service';

describe('ConduceService', () => {
  let service: ConduceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConduceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
