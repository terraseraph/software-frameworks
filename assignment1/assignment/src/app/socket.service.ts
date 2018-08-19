import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// import { Observable } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://software-frameworks-terraseraph.c9users.io:8081';	
  private socket;
  constructor() {
    this.socket = io(this.url);
  }
  
  
  sendMessage(channel_id, message, user) {
    console.log("MEssage sending :", message)
    var msg = {
      message : message,
      user : user
    }
      // this.io.to(channel_id, message)
      this.socket.emit('message', {
          room: channel_id,
          message: msg
      });
      // this.socket.emit('new-message', message);
  }
  
  
  join_channel(channel_id, username){
    this.socket.emit('subscribe', channel_id, function(){
      this.sendMessage(channel_id, `${username} has joined the room`)
    })
  }
  
  leave_channel(channel_id, username){
    this.socket.emit('unsubscribe', channel_id, function(){
      this.sendMessage(channel_id, `${username} has left the room`)
    })
  }

  getMessages(){
    return Observable.create((observer) => {
        this.socket.on('message', (message) => {
            console.log("Got message", message)
            observer.next(message);
        });
    })
  }
}