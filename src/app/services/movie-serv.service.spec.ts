import { TestBed } from '@angular/core/testing';

import { MovieServService } from './movie-serv.service';

describe('MovieServService', () => {
  let service: MovieServService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieServService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
