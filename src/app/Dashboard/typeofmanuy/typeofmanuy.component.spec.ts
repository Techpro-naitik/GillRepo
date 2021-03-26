import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofmanuyComponent } from './typeofmanuy.component';

describe('TypeofmanuyComponent', () => {
  let component: TypeofmanuyComponent;
  let fixture: ComponentFixture<TypeofmanuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeofmanuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeofmanuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
