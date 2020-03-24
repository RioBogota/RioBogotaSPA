import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  spinner = null;
  angle = 0;
  images = null;
  numpics = 1;
  degInt = 360 / this.numpics;
  start = 0;
  current = 1;
  constructor() { }

  ngOnInit() {
    this.spinner = document.querySelector('#spinner');
    this.images = document.querySelectorAll('#spinner figure');
    this.numpics = this.images.length;
    this.degInt = 360 / this.numpics;
    this.images.forEach((element, index) => {
      this.funcinCiclo(index, element);
    });
    this.setCurrent(1);
    this.galleryspin('');
  }

  funcinCiclo = (index, value) => {
    this.images[index].style.webkitTransform = 'rotateY(-' + this.start + 'deg)';
    this.images[index].style.transform = 'rotateY(-' + this.start + 'deg)';
    this.images[index].addEventListener('click', function () {
      if (this.classList.contains('current')) {
        this.classList.toggle('focus');
      }
    });
    this.start = this.start + this.degInt;
  }

  setCurrent = (current) => {
    document.querySelector('figure#spinner figure:nth-child(' + current + ')').classList.add('current');
  }

  galleryspin = (sign) => {
    this.images.forEach((element, index) => {
      this.images[index].classList.remove('current');
      this.images[index].classList.remove('focus');
      this.images[index].classList.remove('caption');
    });

    if (!sign) {
      this.angle = this.angle + this.degInt;
      this.current = (this.current + 1);
      if (this.current > this.numpics) { this.current = 1; }
    } else {
      this.angle = this.angle - this.degInt;
      this.current = this.current - 1;
      if (this.current === 0) { this.current = this.numpics; }
    }

    this.spinner.setAttribute('style', '-webkit-transform: rotateY(' + this.angle + 'deg); transform: rotateY(' + this.angle + 'deg)');
    this.setCurrent(this.current);
    setTimeout(() => {
      this.galleryspin(sign);
    }, 5000);
  }
}
