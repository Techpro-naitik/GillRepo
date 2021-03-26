import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuditionComponent } from './add-audition.component';

describe('AddAuditionComponent', () => {
  let component: AddAuditionComponent;
  let fixture: ComponentFixture<AddAuditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
