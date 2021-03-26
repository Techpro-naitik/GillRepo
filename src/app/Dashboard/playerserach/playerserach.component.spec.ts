import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerserachComponent } from './playerserach.component';

describe('PlayerserachComponent', () => {
  let component: PlayerserachComponent;
  let fixture: ComponentFixture<PlayerserachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerserachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerserachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
