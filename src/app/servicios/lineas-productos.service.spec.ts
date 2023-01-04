import { TestBed } from '@angular/core/testing';

import { LineasProductosService } from './lineas-productos.service';

describe('LineasProductosService', () => {
  let service: LineasProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineasProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
