import { TestBed } from '@angular/core/testing';

import { GeneratorApiService } from './generator-api.service';

describe('GeneratorApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneratorApiService = TestBed.get(GeneratorApiService);
    expect(service).toBeTruthy();
  });
});
