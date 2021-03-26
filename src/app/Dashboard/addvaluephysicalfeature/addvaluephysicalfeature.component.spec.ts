import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvaluephysicalfeatureComponent } from './addvaluephysicalfeature.component';

describe('AddvaluephysicalfeatureComponent', () => {
  let component: AddvaluephysicalfeatureComponent;
  let fixture: ComponentFixture<AddvaluephysicalfeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvaluephysicalfeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvaluephysicalfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
