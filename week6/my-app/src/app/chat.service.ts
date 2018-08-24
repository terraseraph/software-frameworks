import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  username:any
  private url = 'http://software-frameworks-terraseraph.c9users.io:8081';	
  private socket;
  constructor() {
    this.socket = io(this.url);
    
  }

  
  sendMessage(message) {
    console.log("MEssage sending :", message)
    var msg = {
      message : message,
      user : this.username
    }
      this.socket.emit('message', {
          message: msg
      });
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