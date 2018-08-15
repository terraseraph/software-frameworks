import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoService {
  private messagesUrl = 'http://software-frameworks-terraseraph.c9users.io:8081/api/chat/room_messages';
  private roomsListUrl = 'http://software-frameworks-terraseraph.c9users.io:8081/api/chat/rooms';
  private sendMessageUrl = 'http://software-frameworks-terraseraph.c9users.io:8081/api/chat/message';
  
  constructor(private http: Http) { }
  
  
  load_chat_room(id): Observable<any>{
    var dat = {
      room_id : id
    }
    console.log(dat)
    return this.http.post(this.messagesUrl, dat)

  }
  
  load_rooms(): Observable<any>{
    return this.http.get(this.roomsListUrl)
  }
  
  send_message(data): Observable<any>{
    //PUT SOCKET INFO HERE
    return this.http.post(this.sendMessageUrl, data)
  }
  
  
  
  
  //User management
  get_users(){
    return "getting users";
  }
  
  set_users(){
    return "setting users";
  }
  
  user_login(user){
    if(user.username == 'admin' && user.password == '123'){
      
      return true;
    }
  }
  
  //Data handling functions
  private handleData(res: any) {
       let body = res.json();
       console.log(body);
       return body || {};
   }
   
   private handleError(error: any): Promise<any> {
     console.error('ERROR', error);
     return Promise.reject(error.message || error);
  }

}