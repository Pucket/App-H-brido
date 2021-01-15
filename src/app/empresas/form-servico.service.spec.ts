import { TestBed } from '@angular/core/testing';

import { FormServicoService } from './form-servico.service';

describe('FormServicoService', () => {
  let service: FormServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
