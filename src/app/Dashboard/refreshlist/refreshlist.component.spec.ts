import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshlistComponent } from './refreshlist.component';

describe('RefreshlistComponent', () => {
  let component: RefreshlistComponent;
  let fixture: ComponentFixture<RefreshlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
