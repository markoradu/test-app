import { TestBed } from '@angular/core/testing';

import { SuccessModalService } from './success-modal.service';

describe('SuccessModalService', () => {
  let service: SuccessModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
