import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitenewsComponent } from './sitenews.component';

describe('SitenewsComponent', () => {
  let component: SitenewsComponent;
  let fixture: ComponentFixture<SitenewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitenewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitenewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
