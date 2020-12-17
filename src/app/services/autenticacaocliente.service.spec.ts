import { TestBed } from '@angular/core/testing';

import { AutenticacaoclienteService } from './autenticacaocliente.service';

describe('AutenticacaoclienteService', () => {
  let service: AutenticacaoclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacaoclienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
