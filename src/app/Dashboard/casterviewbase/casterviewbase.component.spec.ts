import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasterviewbaseComponent } from './casterviewbase.component';

describe('CasterviewbaseComponent', () => {
  let component: CasterviewbaseComponent;
  let fixture: ComponentFixture<CasterviewbaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasterviewbaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasterviewbaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
