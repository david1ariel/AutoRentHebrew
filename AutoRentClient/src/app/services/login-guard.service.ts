import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  constructor() { }
  canActivate(): boolean {
    if(store.getState().user){
      return true;
    }

    

    return false;
  }
}
