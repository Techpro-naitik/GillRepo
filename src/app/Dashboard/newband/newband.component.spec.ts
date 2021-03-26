import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbandComponent } from './newband.component';

describe('NewbandComponent', () => {
  let component: NewbandComponent;
  let fixture: ComponentFixture<NewbandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
