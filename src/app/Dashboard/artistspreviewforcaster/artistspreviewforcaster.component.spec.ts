import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistspreviewforcasterComponent } from './artistspreviewforcaster.component';

describe('ArtistspreviewforcasterComponent', () => {
  let component: ArtistspreviewforcasterComponent;
  let fixture: ComponentFixture<ArtistspreviewforcasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistspreviewforcasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistspreviewforcasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
