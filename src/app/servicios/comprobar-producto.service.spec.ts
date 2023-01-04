import { TestBed } from '@angular/core/testing';

import { ComprobarProductoService } from './comprobar-producto.service';

describe('ComprobarProductoService', () => {
  let service: ComprobarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
