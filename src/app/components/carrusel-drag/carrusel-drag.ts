import { Component, ElementRef, ViewChild, AfterViewInit, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-carrusel-drag',
  imports: [NgTemplateOutlet],
  templateUrl: './carrusel-drag.html',
  styleUrl: './carrusel-drag.css',
})
export class CarruselDrag {
  @ViewChild('track') track!: ElementRef<HTMLElement>;
  @ViewChild('container') container!: ElementRef<HTMLElement>;

  readonly items = input<any[]>([]);
  readonly itemTemplate = input.required<TemplateRef<any>>();

  translateX = 0;
  dragging = false;

  private startX = 0;
  private prevTranslate = 0;
  private setSize = 0;

  ngAfterViewInit() {
    this.track.nativeElement.querySelectorAll('img')
      .forEach(img => img.addEventListener('dragstart', e => e.preventDefault()));
    setTimeout(() => this.calc());
  }

  private calc() {
  const children = this.track.nativeElement.children;
  if (!children.length) return;

  const firstItem = children[0] as HTMLElement;
  const itemWidth = firstItem.offsetWidth + 16; 
  
  this.setSize = this.items().length * itemWidth;

  this.translateX = -this.setSize;
  this.prevTranslate = this.translateX;
}

  onDown(clientX: number) {
    this.dragging = true;
    this.startX = clientX;
    this.prevTranslate = this.translateX;
  }

  onMove(clientX: number) {
  if (!this.dragging || this.setSize === 0) return;

  const trackEl = this.track.nativeElement;
  const setWidth = trackEl.scrollWidth / 3;

  if (setWidth === 0) return;

  const delta = clientX - this.startX;
  let newTranslate = this.prevTranslate + delta;
  
  if (newTranslate >= 0) {
    newTranslate -= setWidth;
    this.startX = clientX;
    this.prevTranslate = newTranslate;
  }else if(newTranslate <= -setWidth){
    newTranslate += setWidth;
    this.startX = clientX;
    this.prevTranslate = newTranslate
  }


  this.translateX = newTranslate;
  }

  onUp() {
    this.dragging = false;
  }
}
