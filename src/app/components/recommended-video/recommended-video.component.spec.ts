import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedVideoComponent } from './recommended-video.component';

describe('RecommendedVideoComponent', () => {
  let component: RecommendedVideoComponent;
  let fixture: ComponentFixture<RecommendedVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendedVideoComponent]
    });
    fixture = TestBed.createComponent(RecommendedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
