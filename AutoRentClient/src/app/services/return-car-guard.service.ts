import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router'
import { store } from '../redux/store';


@Injectable({
  providedIn: 'root'
})
export class ReturnCarGuardService implements CanActivate {

  constructor() { }
  canActivate(): boolean {
    if (store.getState().user.role === "employee" || store.getState().user.role === "manager")
      return true;
    return false;
  }
}
