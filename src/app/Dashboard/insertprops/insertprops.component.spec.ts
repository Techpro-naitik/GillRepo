import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertpropsComponent } from './insertprops.component';

describe('InsertpropsComponent', () => {
  let component: InsertpropsComponent;
  let fixture: ComponentFixture<InsertpropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertpropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertpropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
