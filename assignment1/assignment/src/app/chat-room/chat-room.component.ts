import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import {MongoService} from "../mongo.service";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  channel_id:any
  channel_name:any
  channel_messages:any
  channel_users:any
  username:any
  message:any
  constructor(private mongo:MongoService, private router:Router, private route: ActivatedRoute) {
    // this.route.params.subscribe( params => this.room_id = params.toString())
  }

  ngOnInit() {
    this.route.params.subscribe( params => this.load_room(params))
    this.username = localStorage.getItem('username')

  }
  
  load_room(params = null){
    console.log(params)
    this.channel_id = params.id
    this.channel_name = params.name
    this.channel_users = this.mongo.channel_user_list
    this.mongo.load_chat_room(params.id)
          .subscribe((messages => this.load_messages(messages) ));                    
      }
      
  
  load_messages(messages){
    var packet = JSON.parse(messages._body)
    console.log(packet.message)
    this.channel_messages = packet.message
  }
  
  //Send message for saving, also loads into current message array
  send_message(event){
    event.preventDefault();
    console.log(this.message)
    var dat = {
      username : this.username,
      channel_id : this.channel_id,
      message : this.message
    }
    
    console.log(dat)
    this.mongo.send_message(dat).subscribe((messages => console.log(messages)));
    this.channel_messages.push(dat)
    this.message = ""
  }

}
