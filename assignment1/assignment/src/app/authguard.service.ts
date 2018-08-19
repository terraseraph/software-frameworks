import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {MongoService} from "./mongo.service";


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private mongo:MongoService, private router: Router) { }
// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  canActivate() {
    var valid = localStorage.getItem('loggedIn')
    
    if (valid == "true") {
      var dat = JSON.parse(localStorage.getItem('session'))
      var p_dat = JSON.parse(dat._body)
      this.mongo.user_data = p_dat.user
      console.log(p_dat)
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
          result.edit_groups = true
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