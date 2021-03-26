import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertdefaultComponent } from './insertdefault.component';

describe('InsertdefaultComponent', () => {
  let component: InsertdefaultComponent;
  let fixture: ComponentFixture<InsertdefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertdefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertdefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
