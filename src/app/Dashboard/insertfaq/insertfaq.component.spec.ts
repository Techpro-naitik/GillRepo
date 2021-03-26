import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertfaqComponent } from './insertfaq.component';

describe('InsertfaqComponent', () => {
  let component: InsertfaqComponent;
  let fixture: ComponentFixture<InsertfaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertfaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
