import { TestBed } from '@angular/core/testing';

import { OrderDetailResolver } from './order-detail.resolver';

describe('OrderDetailResolver', () => {
  let resolver: OrderDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
