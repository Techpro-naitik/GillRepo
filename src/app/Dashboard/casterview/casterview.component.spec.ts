import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasterviewComponent } from './casterview.component';

describe('CasterviewComponent', () => {
  let component: CasterviewComponent;
  let fixture: ComponentFixture<CasterviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasterviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
