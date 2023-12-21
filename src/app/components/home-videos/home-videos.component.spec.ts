import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVideosComponent } from './home-videos.component';

describe('HomeVideosComponent', () => {
  let component: HomeVideosComponent;
  let fixture: ComponentFixture<HomeVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeVideosComponent]
    });
    fixture = TestBed.createComponent(HomeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
