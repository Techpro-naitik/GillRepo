import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditiontopicComponent } from './auditiontopic.component';

describe('AuditiontopicComponent', () => {
  let component: AuditiontopicComponent;
  let fixture: ComponentFixture<AuditiontopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditiontopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditiontopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
