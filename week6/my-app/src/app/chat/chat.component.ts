import { Component, OnInit } from '@angular/core';
import {ChatService} from '../chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username:any
  message:any
  chat_messages = []
  // chat_subscription:Subscription
  constructor(private chat:ChatService) { }

  ngOnInit() {
    
    this.username = this.chat.username
    this.chat_subscribe()
  }
  
  
  
  send_message(event){
    event.preventDefault();
    console.log(this.message)
      var dat = {
        username : this.username,
        message : this.message
      }    
    // this.chat_messages.push(dat)
    this.sendMessage()
    this.message = ""
  }
  
  sendMessage() {
    this.chat.sendMessage(this.message);
  }
  
  
  chat_subscribe(){
    console.log("Joining room")
    this.chat
      .getMessages()
        .subscribe((message: any) => {
          var data = {
            username : message.message.user,
            message : message.message.message
          }
          console.log(data)
          this.chat_messages.push(data);
    });
  }

}
