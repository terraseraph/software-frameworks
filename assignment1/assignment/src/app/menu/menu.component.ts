import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import {MongoService} from "../mongo.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

/**
 * MenuComponent class
 * @constructor MenuComponent
 * 
 */
export class MenuComponent implements OnInit {

  constructor(private router:Router, private mongo:MongoService) { }

  ngOnInit() {
  }
  
  /** Logout */
  logout(){
    localStorage.setItem('loggedIn', "false")
    localStorage.setItem('session', "")
    this.mongo.reset_login()
    this.router.navigateByUrl(`/login`)
  }

}
