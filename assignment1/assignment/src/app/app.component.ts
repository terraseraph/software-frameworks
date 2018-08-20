import { Component } from '@angular/core';
import { SocketService } from "./socket.service";
import {AuthguardService} from "./authguard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * AppComponent class
 * 
 * 
 */
export class AppComponent {
  title = 'app';
  
  constructor(socketService: SocketService, private authguard:AuthguardService) { }
  
  ngOnInit(){
    this.authguard.canActivate()
  }
}
