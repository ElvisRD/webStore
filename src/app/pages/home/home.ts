import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import homeData from './../../../../public/jsons/home.json';

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
