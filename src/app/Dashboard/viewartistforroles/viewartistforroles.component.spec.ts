import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewartistforrolesComponent } from './viewartistforroles.component';

describe('ViewartistforrolesComponent', () => {
  let component: ViewartistforrolesComponent;
  let fixture: ComponentFixture<ViewartistforrolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewartistforrolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewartistforrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
