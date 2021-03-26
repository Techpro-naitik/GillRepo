import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerShelfInquiriesComponent } from './player-shelf-inquiries.component';

describe('PlayerShelfInquiriesComponent', () => {
  let component: PlayerShelfInquiriesComponent;
  let fixture: ComponentFixture<PlayerShelfInquiriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerShelfInquiriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerShelfInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
