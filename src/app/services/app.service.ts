import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  checkUserInfo = new EventEmitter<any>();

  checkUserOptions = new EventEmitter<any>();

  open = new EventEmitter<Boolean>();
  constructor() { }
}
