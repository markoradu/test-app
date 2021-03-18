import { TestBed } from '@angular/core/testing';

import { TfUserCreatePostModalService } from './tf-user-create-post-modal.service';

describe('TfUserCreatePostModalService', () => {
  let service: TfUserCreatePostModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TfUserCreatePostModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
