import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertcastingnewsComponent } from './insertcastingnews.component';

describe('InsertcastingnewsComponent', () => {
  let component: InsertcastingnewsComponent;
  let fixture: ComponentFixture<InsertcastingnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertcastingnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertcastingnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
