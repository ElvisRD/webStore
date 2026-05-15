import { Component, signal } from '@angular/core';
import homeData from './../../../../public/data/home.json';
import { CarruselDrag } from '../../components/carrusel-drag/carrusel-drag';

@Component({
  selector: 'app-home',
  imports: [CarruselDrag],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  contador = signal(0);
  activeSection = 1;
  homeData: any = homeData;
  intervalTime:any = null;

  titleText: string = 'SHIP YOUR WEBSITE QUICKLY WITH FRAMEBLOX';
  introText: string = 'Use prebuilt templates and components for a professional, stunning look. Save time and focus on content with our user-friendly, customizable design solutions.';

  // Datos para la galería de tarjetas, recreando la disposición de la imagen origin

  // Función simulada para los botones de llamada a la acción
  onAction(card: any): void {
    console.log(`Acción para la tarjeta: ${card.title || card.buttonText}`);
    // Aquí iría la lógica de navegación real.
  }

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
