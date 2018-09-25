import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/**
 * MongoService class
 * @constructor MongoService
 * 
 */
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
  
  /** Load chat room */
  load_chat_room(id): Observable<any>{
    var dat = {
      channel_id : id
    }
    console.log(dat)
    return this.http.post(this.messagesUrl, dat)

  }
  
  /** Send message */
  send_message(data): Observable<any>{
    //PUT SOCKET INFO HERE
    return this.http.post(this.sendMessageUrl, data)
  }
  
  
//========Channels==================================

  /** Create channel */
  add_channel(data): Observable<any>{
    console.log(data)
    return this.http.post(this.add_channel_url, data)
  }  
  
  /** Update Channel */
  update_channel(data): Observable<any>{
    return this.http.post(this.update_channel_url, data)
  }
  
  /** Load channel */
  load_channel(id): Observable<any>{
    return this.http.get(`this.all_channel_url/${id}`)
  }  
  
  /** Load all channels */
  load_channels(): Observable<any>{
    return this.http.get(this.all_channel_url)
  }
  
  /** Remove a channel */
  remove_channel(data): Observable<any>{
    return this.http.post(this.remove_channel_url, data)
  }
  
  
//========Groups==================================
  
  /** Create a group */
  add_group(data): Observable<any>{
    console.log(data)
    return this.http.post(this.add_group_url, data)
  }
  
  /** Update group */
  update_group(data): Observable<any>{
    return this.http.post(this.update_group_url, data)
  }
  
  /** Load a group */
  load_group(id): Observable<any>{
    return this.http.get(`${this.all_groups_url}/${id}`)
  }  
  
  /** Load all groups */
  load_groups(): Observable<any>{
    return this.http.get(this.all_groups_url)
  }
  
  /** Remove a group */
  remove_group(data): Observable<any>{
    return this.http.post(this.remove_group_url, data)
  }
  
  
  
  
//=======Users======================================
  
  /** Get all users */
  get_users(): Observable<any>{
    return this.http.get(this.get_users_url);
  }
  
  /** Create user */
  new_user(data): Observable<any>{
    
    return this.http.post(this.add_user_url, data)
  }
  
  /** Update a user */
  update_user(data): Observable<any>{
    return this.http.post(this.update_user_url, data)
  }
  
  /** Remove a user */
  remove_user(data): Observable<any>{
    return this.http.post(this.remove_user_url, data)
  }
  
  /** Login a user */
  user_login(user):Observable<any>{
    return this.http.post(this.login_user_url, user)
  }
  
  /** upload image to user profile */
  upload_image(fd):Observable<any>{
    return this.http.post(this.api+'/users/upload', fd)
    // return this.http.post<any>('http://software-frameworks-terra/seraph.c9users.io:8081/file_upload', fd)
  }
  
  /** Get images from server */
  get_image(name):Observable<any>{
    return this.http.post('http://software-frameworks-terraseraph.c9users.io:8081'+'/images/'+name)
  }
  
  /** Handle data */
  private handleData(res: any) {
      let body = res.json();
      console.log(body);
      return body || {};
  }
  
  /** Handle error */
  private handleError(error: any): Promise<any> {
    console.error('ERROR', error);
    return Promise.reject(error.message || error);
  }
  
  /** On logout, reset user creds */
  public reset_login(){
    this.user_id = null
    this.user_name = null
    this.user_role = null
  }

}


// uploadFileToUrl(files, restObj, uploadUrl): Promise<any> {
//   // Note that setting a content-type header
//   // for mutlipart forms breaks some built in
//   // request parsers like multer in express.
//   const options = {} as any; // Set any options you like
//   const formData = new FormData();

//   // Append files to the virtual form.
//   for (const file of files) {
//     formData.append(file.name, file)
//   }

//   // Optional, append other kev:val rest data to the form.
//   Object.keys(restObj).forEach(key => {
//     formData.append(key, restObj[key]);
//   });

//   // Send it.
//   return this.httpClient.post(uploadUrl, formData, options)
//     .toPromise()
//     .catch((e) => {
//       // handle me
//     });
// }