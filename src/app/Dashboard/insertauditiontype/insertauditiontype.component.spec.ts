import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertauditiontypeComponent } from './insertauditiontype.component';

describe('InsertauditiontypeComponent', () => {
  let component: InsertauditiontypeComponent;
  let fixture: ComponentFixture<InsertauditiontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertauditiontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertauditiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
