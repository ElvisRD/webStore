import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselDrag } from './carrusel-drag';

describe('CarruselDrag', () => {
  let component: CarruselDrag;
  let fixture: ComponentFixture<CarruselDrag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselDrag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselDrag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
