import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddagencyrankComponent } from './addagencyrank.component';

describe('AddagencyrankComponent', () => {
  let component: AddagencyrankComponent;
  let fixture: ComponentFixture<AddagencyrankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddagencyrankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddagencyrankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
