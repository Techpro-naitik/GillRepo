import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalfeatureupdateComponent } from './physicalfeatureupdate.component';

describe('PhysicalfeatureupdateComponent', () => {
  let component: PhysicalfeatureupdateComponent;
  let fixture: ComponentFixture<PhysicalfeatureupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalfeatureupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalfeatureupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
