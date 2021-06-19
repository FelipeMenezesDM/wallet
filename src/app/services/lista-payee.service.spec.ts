import { TestBed } from '@angular/core/testing';

import { ListaPayeeService } from './lista-payee.service';

describe('ListaPayeeService', () => {
  let service: ListaPayeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPayeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
