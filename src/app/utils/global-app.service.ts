import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalAppService {

  // behaviorSubject is an obserable which will help us to 
  //communicate between different components.
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  public localStorageItem(key: string): boolean {
    if (localStorage.getItem(key) === null) {
      console.log(localStorage.getItem(key));
      return false;
    }
    return true;
  }
}
