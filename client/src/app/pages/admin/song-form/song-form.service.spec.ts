import { TestBed } from '@angular/core/testing';

import { SongFormService } from './song-form.service';

describe('SongFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongFormService = TestBed.get(SongFormService);
    expect(service).toBeTruthy();
  });
});
