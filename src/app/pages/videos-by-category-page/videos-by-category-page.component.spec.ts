import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosByCategoryPageComponent } from './videos-by-category-page.component';

describe('VideosByCategoryPageComponent', () => {
  let component: VideosByCategoryPageComponent;
  let fixture: ComponentFixture<VideosByCategoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideosByCategoryPageComponent]
    });
    fixture = TestBed.createComponent(VideosByCategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
