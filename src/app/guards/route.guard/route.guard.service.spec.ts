import { TestBed } from '@angular/core/testing';

import { RouteGuard } from './route.guard.service';

describe('Route.GuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteGuard = TestBed.get(RouteGuard);
    expect(service).toBeTruthy();
  });
});
