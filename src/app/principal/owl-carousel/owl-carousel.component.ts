import { Component, OnInit, ViewChild } from '@angular/core';
import { OwlCarousel } from 'ngx-owl-carousel';

@Component({
  selector: 'app-owl-carousel',
  templateUrl: './owl-carousel.component.html',
  styleUrls: ['./owl-carousel.component.css']
})
export class OwlCarouselComponent implements OnInit {

  public images: Array<string> = [
    '../../assets/PNG/acueducto_bogota.png',
    '../../assets/PNG/Gobernacion.png',
    '../../assets/PNG/Alcaldia.png',
    '../../assets/PNG/Min_Ambiente.png',
    '../../assets/PNG/car.png',
    '../../assets/PNG/DNP.png'

  ];

  public tamanos = [{ imagen: '../../assets/PNG/acueducto_bogota.png', tamano: '100%' },
  { imagen: '../../assets/PNG/Gobernacion.png', tamano: '75%' },
  { imagen: '../../assets/PNG/Alcaldia.png', tamano: '85%' },
  { imagen: '../../assets/PNG/Min_Ambiente.png', tamano: '85%' },
  { imagen: '../../assets/PNG/car.png', tamano: '30%' },
  { imagen: '../../assets/PNG/DNP.png', tamano: '85%' }];

  public opcionesResBaja: Object = {
    items: 2,
    dots: false,
    navigation: true,
    next: 200,
    loop: true,
    center: false,
    autoplay: true,
    autoplayTimeout: 6000,
    animateOut: true,
    animateIn: true,
  }

  public opcionesResMedia: Object = {
    items: 3,
    dots: false,
    navigation: true,
    next: 200,
    loop: true,
    center: false,
    autoplay: true,
    autoplayTimeout: 6000,
    animateOut: true,
    animateIn: true,
  }

  public opcionesResAlta: Object = {
    items: 3,
    dots: false,
    navigation: true,
    next: 200,
    loop: true,
    center: false,
    autoplay: true,
    autoplayTimeout: 6000,
    animateOut: true,
    animateIn: true,
  }

  @ViewChild('owlElement', { static: true }) owlElement: OwlCarousel


  fun() {
    this.owlElement.next([200])
    //duration 200ms
  }
  constructor() { }

  ngOnInit() {
  }

  getWidth(image) {
    return this.tamanos.filter(x => x.imagen == image)[0].tamano;
  }

}
