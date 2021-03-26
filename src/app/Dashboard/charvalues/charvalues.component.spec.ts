import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharvaluesComponent } from './charvalues.component';

describe('CharvaluesComponent', () => {
  let component: CharvaluesComponent;
  let fixture: ComponentFixture<CharvaluesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharvaluesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharvaluesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
