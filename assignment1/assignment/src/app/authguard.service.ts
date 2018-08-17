import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router) { }
// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  canActivate() {
    var valid = localStorage.getItem('loggedIn')
    
    if (valid == "true") {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }  
}