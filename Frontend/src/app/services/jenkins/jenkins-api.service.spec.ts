import { TestBed } from '@angular/core/testing';

import { JenkinsApiService } from './jenkins-api.service';

describe('JenkinsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JenkinsApiService = TestBed.get(JenkinsApiService);
    expect(service).toBeTruthy();
  });
});
