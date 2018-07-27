import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  name      : string;
  age       : string;
  dob       : string;
  id        : string;
  username  : string;
  constructor(private router:Router) { }

  ngOnInit() {
    var data = localStorage.getItem('session')
    data = JSON.parse(data)
    this.name = data.name;
    this.username = data.username;
    this.age = data.age;
    this.id = data.id;
    this.dob = data.dob;
  }
  
  logout(){
    localStorage.setItem('session', '')
    console.log('Session Cleared')
    this.router.navigateByUrl('/login')
  }

}
