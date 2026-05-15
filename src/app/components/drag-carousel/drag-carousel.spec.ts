import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragCarousel } from './drag-carousel';

describe('DragCarousel', () => {
  let component: DragCarousel;
  let fixture: ComponentFixture<DragCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
