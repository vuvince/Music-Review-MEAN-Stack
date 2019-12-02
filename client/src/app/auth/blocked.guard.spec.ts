import { TestBed, async, inject } from '@angular/core/testing';

import { BlockedGuard } from './blocked.guard';

describe('BlockedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockedGuard]
    });
  });

  it('should ...', inject([BlockedGuard], (guard: BlockedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
