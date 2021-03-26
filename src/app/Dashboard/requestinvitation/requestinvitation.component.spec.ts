import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestinvitationComponent } from './requestinvitation.component';

describe('RequestinvitationComponent', () => {
  let component: RequestinvitationComponent;
  let fixture: ComponentFixture<RequestinvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestinvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestinvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
