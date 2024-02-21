import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,CanActivateChild, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../component/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    try {
      let token = JSON.parse(window.localStorage.getItem("key"))
      if (token == null) {
        return false
      }
      else {
        return true
      }
    } catch (error) {
      return false
    }
  }
}
