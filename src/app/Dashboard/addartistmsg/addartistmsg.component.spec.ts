import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddartistmsgComponent } from './addartistmsg.component';

describe('AddartistmsgComponent', () => {
  let component: AddartistmsgComponent;
  let fixture: ComponentFixture<AddartistmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddartistmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddartistmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
