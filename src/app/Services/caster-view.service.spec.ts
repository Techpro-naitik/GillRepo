import { TestBed } from '@angular/core/testing';

import { CasterViewService } from './caster-view.service';

describe('CasterViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CasterViewService = TestBed.get(CasterViewService);
    expect(service).toBeTruthy();
  });
});
