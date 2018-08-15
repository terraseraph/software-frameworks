import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {MongoService} from "../mongo.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = '';
  password:string = '';
  constructor(private mongo:MongoService, private router:Router, private form:FormsModule) { }

  ngOnInit() {
    if (typeof(Storage) !== "undefined"){
      console.log("storage ready!")
    }
  }
  
  loginUser(event){
    event.preventDefault();
    console.log(this.username, this.password)
    if(this.mongo.user_login({username: this.username, password : this.password})){
      console.log('MONGO LOGIN WORKS')
    }
    if(this.username == 'admin' && this.password =='123'){
      this.router.navigateByUrl('/main')
      var data = {
        id        : '1',
        username  : this.username,
        name      : "admin guy",
        age       : "90",
        dob       : "20/1/1928"
      }
      localStorage.setItem("session", JSON.stringify(data))
      localStorage.setItem("username", this.username)
    }
    else{
      console.log('Login fail')
    }
  }

}
