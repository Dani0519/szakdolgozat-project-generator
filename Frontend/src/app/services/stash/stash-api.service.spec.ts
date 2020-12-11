import { TestBed } from '@angular/core/testing';

import { StashApiService } from './stash-api.service';

describe('StashApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StashApiService = TestBed.get(StashApiService);
    expect(service).toBeTruthy();
  });
});
