import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostViewedPageComponent } from './most-viewed-page.component';

describe('MostViewedPageComponent', () => {
  let component: MostViewedPageComponent;
  let fixture: ComponentFixture<MostViewedPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostViewedPageComponent]
    });
    fixture = TestBed.createComponent(MostViewedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
