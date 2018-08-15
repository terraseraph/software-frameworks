import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  sessionData:string = '';
  constructor() { }

  ngOnInit() {
        var data = localStorage.getItem('session')
        this.sessionData = data
  }

}
