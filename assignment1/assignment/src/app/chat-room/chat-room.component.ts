import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import {MongoService} from "../mongo.service";
import {AuthguardService} from "../authguard.service";
import {SocketService} from "../socket.service";
import { OnDestroy } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {FormsModule} from '@angular/forms';
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
  first_load = true
  image_selected = false
  send_image:any
  selected_image:any
  image_api_url = 'http://software-frameworks-terraseraph.c9users.io:8081/api/images/'
  form_errors = true
  
  
  constructor(private socket:SocketService,
    private mongo:MongoService,
    private router:Router,
    private route: ActivatedRoute,
    private authguard:AuthguardService,
    // private formGroup:FormGroup,
    // private validators:Validators,
    // private formBuilder:FormBuilder,
    // private formControl:FormControl,
    private formsModule:FormsModule) {
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
        user_id : this.mongo.user_data._id,
        channel_id : this.channel_id,
        message : this.message,
        image : ""
      }
    if(this.image_selected || this.send_image != null){
      this.upload_image(dat, function(result){
        console.log('SENDING MESSAGE with image====', result)
      })
    }
    else{
      console.log('SENDING MESSAGE without image====', dat)
      this.mongo.send_message(dat).subscribe((messages => console.log(messages)));
      this.sendMessage(this.channel_id,this.message,this.username,this.mongo.user_data._id,"")
    }
    //this.channel_messages.push(dat)
    // this.message = ""
  }
  
  onFileSelected(event){
    event.preventDefault()
    // this.image_selected = true
    this.selected_image = event.target.files[0]
    console.log(this.image_selected, this.selected_image)
  }
  
  upload_image(data, callback){
    var fd = new FormData();
    fd.append('image', this.selected_image, this.selected_image.name)
    this.mongo.upload_image(fd).subscribe(result => {
      let res = JSON.parse(result._body)
      console.log(res)
      data.image = res.data.name;
      this.mongo.send_message(data).subscribe((messages => console.log(messages)));
      this.sendMessage()
      this.image_selected = false;
      this.send_image = null;
      callback(data)
    })
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
            user_id : message.message.user_id,
            channel_id : this.channel_id,
            message : message.message.message,
            image : message.message.image
          }
          if(data.image == ""){
            data.image = "blank.jpg"
            // data.image = this.mongo.api+'/images/'+data.image
          }
          console.log(data)
          this.channel_messages.push(data);
    });
  }
  
  /** Send message to socket */
  sendMessage(id = this.channel_id, msg = this.message, usr = this.username, user_id = this.mongo.user_data._id, img = this.selected_image.name) {
    console.log("SENDING TO SOCKETS", id, msg, usr, user_id, img)
    this.socket.sendMessage(id, msg, usr, user_id, img);
  }
  
  
  /** When leaving the room, unsubscribe from socket */
  chat_unsubscribe() {
    if(!this.first_load){
      this.chat_subscription.unsubscribe();
    }
  }

}
