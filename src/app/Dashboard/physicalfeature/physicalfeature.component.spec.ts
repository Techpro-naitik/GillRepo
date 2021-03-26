import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalfeatureComponent } from './physicalfeature.component';

describe('PhysicalfeatureComponent', () => {
  let component: PhysicalfeatureComponent;
  let fixture: ComponentFixture<PhysicalfeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalfeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
