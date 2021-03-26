import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertauditiontopicComponent } from './insertauditiontopic.component';

describe('InsertauditiontopicComponent', () => {
  let component: InsertauditiontopicComponent;
  let fixture: ComponentFixture<InsertauditiontopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertauditiontopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertauditiontopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
