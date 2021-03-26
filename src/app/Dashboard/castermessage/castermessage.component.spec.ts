import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastermessageComponent } from './castermessage.component';

describe('CastermessageComponent', () => {
  let component: CastermessageComponent;
  let fixture: ComponentFixture<CastermessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastermessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
