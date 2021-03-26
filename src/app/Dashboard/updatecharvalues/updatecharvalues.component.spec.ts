import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecharvaluesComponent } from './updatecharvalues.component';

describe('UpdatecharvaluesComponent', () => {
  let component: UpdatecharvaluesComponent;
  let fixture: ComponentFixture<UpdatecharvaluesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecharvaluesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecharvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
