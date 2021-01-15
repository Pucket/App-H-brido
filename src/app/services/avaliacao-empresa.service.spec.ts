import { TestBed } from '@angular/core/testing';

import { AvaliacaoEmpresaService } from './avaliacao-empresa.service';

describe('AvaliacaoEmpresaService', () => {
  let service: AvaliacaoEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
