import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistmsgComponent } from './artistmsg.component';

describe('ArtistmsgComponent', () => {
  let component: ArtistmsgComponent;
  let fixture: ComponentFixture<ArtistmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
