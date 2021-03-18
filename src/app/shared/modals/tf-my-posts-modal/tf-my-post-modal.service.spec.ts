import { TestBed } from '@angular/core/testing';

import { TfMyPostModalService } from './tf-my-post-modal.service';

describe('TfMyPostModalService', () => {
  let service: TfMyPostModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfMyPostModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
