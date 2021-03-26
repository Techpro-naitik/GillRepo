import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyrankComponent } from './agencyrank.component';

describe('AgencyrankComponent', () => {
  let component: AgencyrankComponent;
  let fixture: ComponentFixture<AgencyrankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyrankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyrankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
