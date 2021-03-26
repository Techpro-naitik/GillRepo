import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchresultscolumnviewComponent } from './searchresultscolumnview.component';

describe('SearchresultscolumnviewComponent', () => {
  let component: SearchresultscolumnviewComponent;
  let fixture: ComponentFixture<SearchresultscolumnviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchresultscolumnviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchresultscolumnviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
