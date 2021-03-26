import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingnewsComponent } from './castingnews.component';

describe('CastingnewsComponent', () => {
  let component: CastingnewsComponent;
  let fixture: ComponentFixture<CastingnewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastingnewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastingnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
