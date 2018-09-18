import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import {MongoService} from "../mongo.service";
import {AuthguardService} from "../authguard.service";
import {SocketService} from "../socket.service";
import { OnDestroy } from "@angular/core";
// import { ISubscription } from "rxjs/Subscription";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})

/**
 * ChatRoomComponent class
 * @constructor ChatRoomComponent
 * 
 */
export class ChatRoomComponent implements OnInit {
  channel_id:any
  channel_name:any
  channel_messages:any
  channel_users:any
  username:any
  message:any
  chat_subscription:Subscription
  first_load = true;
  
  constructor(private socket:SocketService, private mongo:MongoService, private router:Router, private route: ActivatedRoute, private authguard:AuthguardService) {
    // this.route.params.subscribe( params => this.room_id = params.toString())
  }

  ngOnInit() {
    this.authguard.canActivate()
    this.route.params.subscribe( params => {
      this.chat_unsubscribe()
      this.load_room(params)
      this.chat_subscribe()
    })
    this.username = localStorage.getItem('username')

  }
  
  /** Loads the chat room */
  load_room(params = null){
    console.log(params)
    this.channel_id = params.id
    this.channel_name = params.name
    this.channel_users = this.mongo.channel_user_list
    this.mongo.load_chat_room(params.id)
          .subscribe((messages => this.load_messages(messages) ));                    
    setTimeout(() => {
        console.log('Joining Channel');
        this.socket.join_channel(this.channel_id, this.mongo.user_data.username);
        this.first_load = false
    }, 100);
  }
      
  /** Loads the saved messages */
  load_messages(messages){
    var packet = JSON.parse(messages._body)
    console.log(packet.message)
    this.channel_messages = packet.message
    
  }
  
  /** Send message for saving, also loads into current message array */
  send_message(event){
    event.preventDefault();
    console.log(this.message)
      var dat = {
        username : this.username,
        channel_id : this.channel_id,
        message : this.message
      }    
    this.mongo.send_message(dat).subscribe((messages => console.log(messages)));
    //this.channel_messages.push(dat)
    this.sendMessage()
    this.message = ""
  }
  
  
  //===============Sockets===================//
  
  /** Subscribe to current channel */
  chat_subscribe(){
    console.log("Joining room: ", this.channel_id)
    this.chat_subscription = this.socket
      .getMessages()
        .subscribe((message: any) => {
          var data = {
            username : message.message.user,
            channel_id : this.channel_id,
            message : message.message.message
          }
          console.log(data)
          this.channel_messages.push(data);
    });
  }
  
  /** Send message to socket */
  sendMessage(id = this.channel_id, msg = this.message, usr = this.username) {
    this.socket.sendMessage(id, msg, usr);
  }
  
  
  /** When leaving the room, unsubscribe from socket */
  chat_unsubscribe() {
    if(!this.first_load){
      this.chat_subscription.unsubscribe();
    }
  }

}
