import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  openNavbar: boolean = false;
  links = [
    { name: 'Inicio', href: '/' },
    { name: 'Colecciones', href: '/collections' },
    { name: 'Hombre', href: '/men' },
    { name: 'Mujer', href: '/women' },
  ]

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event): void {
    const width = window.innerWidth;
    if (width >= 768) {
      this.openNavbar = false;
    }
  }


}
