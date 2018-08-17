import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  logout(){
    localStorage.setItem('loggedIn', "false")
    this.router.navigateByUrl(`/login`)
  }

}
