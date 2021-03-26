import { TestBed } from '@angular/core/testing';

import { TextsandnewsService } from './textsandnews.service';

describe('TextsandnewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TextsandnewsService = TestBed.get(TextsandnewsService);
    expect(service).toBeTruthy();
  });
});
