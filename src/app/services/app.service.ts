import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  checkUserInfo = new EventEmitter<any>();

  checkUserOptions = new EventEmitter<any>();

  open = new EventEmitter<Boolean>();

  private color: string;
  private style: string;

  getStyle() {
   return `position: fixed;
    top: 0;
    z-index: 100;
    background-color: ${this.color};
    width: 100%;
    color: white;
    height: 3rem;
    text-align: center;
    padding-top: 0.5rem;
    font-weight: bold;
    padding-top: 0.6rem;`
  }

  success(text: string) {
    this.color = 'green';
    this.message(text);
  }

  error(text: string) {
    this.color = 'red';
    this.message(text);
  }

  warning(text: string) {
    this.color = '#FF7152';
    this.message(text);
  }

  message(text: string) {
    let division = document.createElement('div');
    division.setAttribute('style', this.getStyle());
    let textNode = document.createTextNode(text);
    division.appendChild(textNode);
    document.body.appendChild(division);
    setTimeout(() => { document.body.removeChild(division); }, 5000);
  }


  constructor() { }
}
