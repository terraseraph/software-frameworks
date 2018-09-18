import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
// import { Observable } from 'rxjs';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * SocketService class
 * @constructor SocketService
 * 
 */
export class SocketService {
  private url = 'http://software-frameworks-terraseraph.c9users.io:8081';	
  private socket;
  constructor() {
    this.socket = io(this.url);
  }
  
  /** Send a message over sockets */
  sendMessage(channel_id, message, user) {
    console.log("MEssage sending :", message)
    var msg = {
      message : message,
      user : user
    }
      this.socket.emit('message', {
          room: channel_id,
          message: msg
      });
  }
  
  /** Join a channel */
  join_channel(channel_id, username){
    this.socket.emit('subscribe', channel_id, function(dat){
      console.log("JOINING CHANNEL");
      console.log(dat);
    })
    setTimeout(() => {
     this.sendMessage(channel_id, `${username} has joined the room`, username)
    }, 100);
  }
  
  // `${username} has joined the room`
  
  /** Leave a channel */
  leave_channel(channel_id, username){
    this.socket.emit('unsubscribe', channel_id, function(dat){
      console.log(dat)
    })
    setTimeout(() => {
     this.sendMessage(channel_id, `${username} has left the room`, username)
    }, 100);
  }

  /** Get all messages for the channel */
  getMessages(){
    return Observable.create((observer) => {
        this.socket.on('message', (message) => {
            console.log("Got message", message)
            observer.next(message);
        });
    })
  }
}