import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertagencyComponent } from './insertagency.component';

describe('InsertagencyComponent', () => {
  let component: InsertagencyComponent;
  let fixture: ComponentFixture<InsertagencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertagencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertagencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
