import { Component, OnInit } from '@angular/core';
import {MongoService} from "../mongo.service";
import {AuthguardService} from "../authguard.service";
import {MethodsService} from "../methods.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

/**
 * MainComponent class
 * @constructor MainComponent
 * 
 */
export class MainComponent implements OnInit {
  sessionData:string = '';
  user_data:any
  update_username:any
  update_password:any
  update_fullname:any
  update_dob:any
  update_email:any
  
  username:any
  fullname:any
  dob:any
  email:any
  
  constructor(private mongo:MongoService, private authguard:AuthguardService, private methods:MethodsService) { }

  ngOnInit() {
        this.authguard.canActivate()
        var data = localStorage.getItem('session')
        this.sessionData = data
        this.parse_user_data(this.mongo.user_data)
        this.methods.callComponentMethod();
  }
  
  /** Parse the user data to store locally */
  parse_user_data(data, update = false){
    if(update){
      localStorage.setItem("session", JSON.stringify(data))
      data = JSON.parse(data._body)
      data = data.user
      this.mongo.user_data = data
    }
    
    console.log(this.mongo.user_data)
    console.log(this.user_data)
    this.user_data = data
    
    this.update_username = data.username
    this.update_password = data.password
    this.update_fullname = data.details.fullname
    this.update_dob = data.details.dob
    this.update_email = data.details.email
    console.log("USER DATA MAIN: ", this.user_data)
  }
  
  /** UI and database update user */
  update_user(event){
    event.preventDefault()
    var details_obj = {
      dob : this.update_dob,
      email : this.update_email,
      fullname : this.update_fullname
    }
    var data = {
      id : this.mongo.user_data._id,
      username: this.update_username,
      role: this.user_data.role,
      details : details_obj
    }
    console.log(data)
    // this.user_data = data
    this.mongo.update_user(data).subscribe((update => this.parse_user_data(update, true)))
  }

}
