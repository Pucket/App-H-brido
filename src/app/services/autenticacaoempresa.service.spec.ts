import { TestBed } from '@angular/core/testing';

import { AutenticacaoempresaService } from './autenticacaoempresa.service';

describe('AutenticacaoempresaService', () => {
  let service: AutenticacaoempresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoempresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
