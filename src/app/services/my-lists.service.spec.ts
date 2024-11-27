import { TestBed } from '@angular/core/testing';

import { MyListsService } from './my-lists.service';

describe('MyListsService', () => {
  let service: MyListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
