import { TestBed } from '@angular/core/testing';

import { DeployAPIService } from './deploy-api.service';

describe('DeployAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeployAPIService = TestBed.get(DeployAPIService);
    expect(service).toBeTruthy();
  });
});
