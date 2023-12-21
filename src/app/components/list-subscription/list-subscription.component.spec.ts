import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSubscriptionComponent } from './list-subscription.component';

describe('ListSubscriptionComponent', () => {
  let component: ListSubscriptionComponent;
  let fixture: ComponentFixture<ListSubscriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSubscriptionComponent]
    });
    fixture = TestBed.createComponent(ListSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
