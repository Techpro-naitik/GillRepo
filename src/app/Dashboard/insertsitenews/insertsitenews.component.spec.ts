import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertsitenewsComponent } from './insertsitenews.component';

describe('InsertsitenewsComponent', () => {
  let component: InsertsitenewsComponent;
  let fixture: ComponentFixture<InsertsitenewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertsitenewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertsitenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
