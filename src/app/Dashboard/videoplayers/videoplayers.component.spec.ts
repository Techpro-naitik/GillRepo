import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayersComponent } from './videoplayers.component';

describe('VideoplayersComponent', () => {
  let component: VideoplayersComponent;
  let fixture: ComponentFixture<VideoplayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoplayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
