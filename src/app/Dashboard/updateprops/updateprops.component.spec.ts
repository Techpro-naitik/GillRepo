import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepropsComponent } from './updateprops.component';

describe('UpdatepropsComponent', () => {
  let component: UpdatepropsComponent;
  let fixture: ComponentFixture<UpdatepropsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepropsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
