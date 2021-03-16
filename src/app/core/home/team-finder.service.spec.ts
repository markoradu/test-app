import { TestBed } from '@angular/core/testing';

import { TeamFinderService } from './team-finder.service';

describe('TeamFinderService', () => {
  let service: TeamFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
