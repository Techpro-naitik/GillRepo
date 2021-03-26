import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshlistdetailsComponent } from './refreshlistdetails.component';

describe('RefreshlistdetailsComponent', () => {
  let component: RefreshlistdetailsComponent;
  let fixture: ComponentFixture<RefreshlistdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshlistdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshlistdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
