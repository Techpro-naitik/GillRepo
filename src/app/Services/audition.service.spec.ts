import { TestBed } from '@angular/core/testing';

import { AuditionService } from './audition.service';

describe('AuditionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditionService = TestBed.get(AuditionService);
    expect(service).toBeTruthy();
  });
});
