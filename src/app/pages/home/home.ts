import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import homeData from './../../../../public/data/home.json';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  contador = signal(0);
  activeSection = 1;
  homeData: any = homeData;
  drops: any = homeData.newDrops.drops;
  intervalTime:any = null;

  readonly sections = [
    { id: 1, title: 'Limited Drops, Maximum Impact' },
    { id: 2, title: 'Built for the Streets' },
    { id: 3, title: 'Art Meets Attitude' },
    { id: 4, title: 'Future-Ready Fashion' },
    { id: 5, title: 'Community-Driven Culture' },
  ];


  ngOnInit(){
    this.initTimeImage();
  }

  ngOnDestroy() {
    if (this.intervalTime) {
      clearInterval(this.intervalTime);
    }
  }

  products = signal<any>([
    {
      id: 'p1',
      name: 'SHADOW DRIP',
      shortDescription: 'A sleek, minimalist hoodie with dark tones and subtle reflective accents for an effortless street vibe.',
      imageUrl: '/assets/images/shadow-drip.jpg', // Tu imagen real
      price: 89,
      originalPrice: 129,
      isNew: true
    },
    {
      id: 'p2',
      name: 'URBAN PHANTOM',
      shortDescription: 'Urban Phantom - A bold, oversized hoodie with edgy graphics and a stealthy aesthetic inspired by city nights.',
      imageUrl: '/assets/images/urban-phantom.jpg', // Tu imagen real
      price: 89,
      originalPrice: 129,
      isNew: true
    },
    {
      id: 'p3',
      name: 'NEON REBELLION',
      shortDescription: 'A statement piece with vibrant neon details and rebellious street art influences for a standout look.',
      imageUrl: '/assets/images/neon-rebellion.jpg', // Tu imagen real
      price: 89,
      originalPrice: 129,
      isNew: true
    }
  ]);

  initTimeImage(){
    this.intervalTime = setInterval(() => {
      this.contador.update(time => {
        if(time>=17){
          (this.activeSection === 5) ? this.activeSection = 1 : this.activeSection = this.activeSection + 1;
          return 0.25;
        }
        return time + 1
      }); 
    }, 300)
  }

  initSection(id: number){
    clearInterval(this.intervalTime)
    this.contador.set(0.25)
    this.activeSection = id;
    this.initTimeImage();
  }
  
}
