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
  
  check_role(role){
    console.log("Checking role: ", role)
    var result = {
      edit_users : false,
      edit_groups : false,
      edit_channels : false,
      edit_user_group_admin : false,
      edit_user_super_admin : false
    }
    switch(role) { 
       case "user": { 
          break; 
       } 
       case "group_admin": { 
          result.edit_users = true
          result.edit_user_group_admin = true
          result.edit_channels = true
          // return result
          break; 
       }
       case "super_admin": { 
          result.edit_users = true,
          result.edit_groups = true,
          result.edit_channels = true,
          result.edit_user_group_admin = true,
          result.edit_user_super_admin = true          
          break; 
       }
    } 
       return result
  }
}