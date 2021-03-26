import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertphysicalfeatureComponent } from './insertphysicalfeature.component';

describe('InsertphysicalfeatureComponent', () => {
  let component: InsertphysicalfeatureComponent;
  let fixture: ComponentFixture<InsertphysicalfeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertphysicalfeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertphysicalfeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
