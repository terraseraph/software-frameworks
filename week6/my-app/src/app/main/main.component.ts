import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import {ChatService} from '../chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  username:any
  constructor(private router:Router, private chat:ChatService) { }

  ngOnInit() {
  }
  
  
  login(){
     this.chat.username = this.username
     localStorage.setItem('username', this.username)
     this.router.navigateByUrl(`/chat`)
  }

}
