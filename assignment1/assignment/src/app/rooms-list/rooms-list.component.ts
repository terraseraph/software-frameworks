import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import {ActivatedRoute} from "@angular/router";
import {MongoService} from "../mongo.service";

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  rooms_list:any = {
    "rooms" : [
        {
          "room_id" : 0,
          "room_name" : "example chat"
        },
        {
          "room_id" : 1,
          "room_name" : "Second chat"
        },        
    ]
  }

  
  constructor(private mongo:MongoService, private router:Router) { }

  ngOnInit() {
    this.load_rooms()
  }
  
  //click event for room button
  chat_btn(id:any, name:any){
    localStorage.setItem("room_id", id)
    console.log("set id: ", id)
    this.router.navigateByUrl(`/chat-room/${id}/${name}`)
  }
  
  
  //pre loading the list of rooms from the db
  load_rooms(){
    this.mongo.load_rooms()
          .subscribe((messages => this.create_list(messages) ));     
  }
  
  //creates rooms list for buttons
  create_list(messages){
    var message = JSON.parse(messages._body)
    console.log(message.message)
    this.rooms_list = message.message
  }

}
