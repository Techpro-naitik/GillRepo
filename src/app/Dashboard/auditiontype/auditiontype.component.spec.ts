import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditiontypeComponent } from './auditiontype.component';

describe('AuditiontypeComponent', () => {
  let component: AuditiontypeComponent;
  let fixture: ComponentFixture<AuditiontypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditiontypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditiontypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
