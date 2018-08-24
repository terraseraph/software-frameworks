import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ChatService} from './chat.service';
import {RouterModule, Routes, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Week 6';
  constructor(private router:Router, private chat:ChatService) { }

  ngOnInit() {
    this.router.navigateByUrl(`/main`)
  }
  
}
