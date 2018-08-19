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
  
  public user_data:any
  public user_id:any
  public user_name:any
  public user_role:any
  public user_list:any
  public groups_list:any
  public channels_list:any
  public old_channel:any
  public channel_id:any
  
  public channel_user_list:any
  
  private api = `http://software-frameworks-terraseraph.c9users.io:8081/api`;
  
  private add_group_url = `${this.api}/group/add_group`;
  private update_group_url = `${this.api}/group/update_group`;
  private get_group_url = `${this.api}/group/get_group`;
  private all_groups_url = `${this.api}/group`;
  private remove_group_url = `${this.api}/group/remove_group`;
  
  private add_channel_url = `${this.api}/channel/add_channel`;
  private update_channel_url = `${this.api}/channel/update_channel`;
  private get_channel_url = `${this.api}/channel`;
  private all_channel_url = `${this.api}/channel`;
  private remove_channel_url = `${this.api}/channel/remove_channel`;
  
  private add_user_url = `${this.api}/users`;
  private get_users_url = `${this.api}/users`;
  private update_user_url = `${this.api}/users/edit`;
  private get_user_url = `${this.api}/users`;
  private remove_user_url = `${this.api}/users/remove`;
  private login_user_url = `${this.api}/users/login`;
  
  private messagesUrl = 'http://software-frameworks-terraseraph.c9users.io:8081/api/chat/room_messages';
  private sendMessageUrl = 'http://software-frameworks-terraseraph.c9users.io:8081/api/chat/message';
  
  
  constructor(private http: Http) { }
  
  
  load_chat_room(id): Observable<any>{
    var dat = {
      channel_id : id
    }
    console.log(dat)
    return this.http.post(this.messagesUrl, dat)

  }
  
  send_message(data): Observable<any>{
    //PUT SOCKET INFO HERE
    return this.http.post(this.sendMessageUrl, data)
  }
  
  
//========Channels==================================
  add_channel(data): Observable<any>{
    console.log(data)
    return this.http.post(this.add_channel_url, data)
  }  
  
  update_channel(data): Observable<any>{
    return this.http.post(this.update_channel_url, data)
  }
  
  load_channel(id): Observable<any>{
    return this.http.get(`this.all_channel_url/${id}`)
  }  
  
  load_channels(): Observable<any>{
    return this.http.get(this.all_channel_url)
  }
  
  
  remove_channel(data): Observable<any>{
    return this.http.post(this.remove_channel_url, data)
  }
  
  
//========Groups==================================
  add_group(data): Observable<any>{
    console.log(data)
    return this.http.post(this.add_group_url, data)
  }
  
  update_group(data): Observable<any>{
    return this.http.post(this.update_group_url, data)
  }
  
  load_group(id): Observable<any>{
    return this.http.get(`${this.all_groups_url}/${id}`)
  }  
  
  load_groups(): Observable<any>{
    return this.http.get(this.all_groups_url)
  }
  
  
  remove_group(data): Observable<any>{
    return this.http.post(this.remove_group_url, data)
  }
  
  
  
  
//=======Users======================================
  get_users(): Observable<any>{
    return this.http.get(this.get_users_url);
  }
  
  set_users(){
    return "setting users";
  }
  
  new_user(data): Observable<any>{
    
    return this.http.post(this.add_user_url, data)
  }
  
  update_user(data): Observable<any>{
    return this.http.post(this.update_user_url, data)
  }
  
  remove_user(data): Observable<any>{
    return this.http.post(this.remove_user_url, data)
  }
  
  user_login(user):Observable<any>{
    return this.http.post(this.login_user_url, user)
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
  
  public reset_login(){
    this.user_id = null
    this.user_name = null
    this.user_role = null
  }

}