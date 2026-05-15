import { Component, ElementRef, ViewChild, AfterViewInit, input, TemplateRef, OnDestroy, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-drag-carousel',
  imports: [NgTemplateOutlet],
  templateUrl: './drag-carousel.html',
  styleUrl: './drag-carousel.css',
})
export class DragCarousel implements AfterViewInit, OnDestroy {
  @ViewChild('track') track!: ElementRef<HTMLElement>;
  @ViewChild('container') container!: ElementRef<HTMLElement>;

  readonly items = input<any[]>([]);
  readonly itemTemplate = input.required<TemplateRef<any>>();

  readonly translateX = signal(0);
  dragging = false;

  private startX = 0;
  private prevTranslate = 0;
  private totalSetWidth = 0;
  private resizeObserver: ResizeObserver | null = null;

  ngAfterViewInit() {
    this.track.nativeElement.querySelectorAll('img')
      .forEach(img => img.addEventListener('dragstart', e => e.preventDefault()));
    this.calc();
    this.resizeObserver = new ResizeObserver(() => this.calc());
    this.resizeObserver.observe(this.container.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  private calc() {
    const children = this.track.nativeElement.children;
    if (!children.length) return;

    const firstItem = children[0] as HTMLElement;
    const itemWidth = firstItem.offsetWidth + 16;
    this.totalSetWidth = this.items().length * itemWidth;
    this.translateX.set(-this.totalSetWidth);
    this.prevTranslate = this.translateX();
  }

  onDown(clientX: number) {
    this.dragging = true;
    this.startX = clientX;
    this.prevTranslate = this.translateX();
  }

  onMove(clientX: number) {
    if (!this.dragging || this.totalSetWidth === 0) return;

    const setWidth = this.track.nativeElement.scrollWidth / 3;
    if (setWidth === 0) return;

    const delta = clientX - this.startX;
    let newTranslate = this.prevTranslate + delta;

    if (newTranslate >= 0) {
      newTranslate -= setWidth;
      this.startX = clientX;
      this.prevTranslate = newTranslate;
    } else if (newTranslate <= -setWidth) {
      newTranslate += setWidth;
      this.startX = clientX;
      this.prevTranslate = newTranslate;
    }

    this.translateX.set(newTranslate);
  }

  onUp() {
    this.dragging = false;
  }
}
