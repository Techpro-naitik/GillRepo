import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogninotificationComponent } from './logninotification.component';

describe('LogninotificationComponent', () => {
  let component: LogninotificationComponent;
  let fixture: ComponentFixture<LogninotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogninotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogninotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
