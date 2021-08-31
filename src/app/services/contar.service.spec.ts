import { TestBed } from '@angular/core/testing';

import { ContarService } from './contar.service';

describe('ContarService', () => {
  let service: ContarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
