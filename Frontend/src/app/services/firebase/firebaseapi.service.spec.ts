import { TestBed } from '@angular/core/testing';

import { FirebaseapiService } from './firebaseapi.service';

describe('FirebaseapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseapiService = TestBed.get(FirebaseapiService);
    expect(service).toBeTruthy();
  });
});
