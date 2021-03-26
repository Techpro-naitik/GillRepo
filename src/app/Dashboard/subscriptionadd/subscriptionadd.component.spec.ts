import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionaddComponent } from './subscriptionadd.component';

describe('SubscriptionaddComponent', () => {
  let component: SubscriptionaddComponent;
  let fixture: ComponentFixture<SubscriptionaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
