import { TestBed } from '@angular/core/testing';

import { ListSubscriptionService } from './list-subscription.service';

describe('ListSubscriptionService', () => {
  let service: ListSubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListSubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
