import { TestBed } from '@angular/core/testing';

import { PlanMedicamentoService } from './plan-medicamento.service';

describe('PlanMedicamentoService', () => {
  let service: PlanMedicamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanMedicamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
