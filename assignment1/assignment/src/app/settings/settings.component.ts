import { Component, OnInit } from '@angular/core';
import {MongoService} from "../mongo.service";
import { RoomsListComponent } from '../rooms-list/rooms-list.component';
import {MethodsService} from "../methods.service";
import {AuthguardService} from "../authguard.service";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  
  auth_role:any
  
  users:any
  new_username:any
  new_password:any
  new_role:any
  
  update_username:any
  update_password:any
  update_role:any
  update_id:any
  
  settings_group_list:any
  
  new_group_name:any
  
  update_group_id:any
  update_group_name:any
  update_group_admins:any
  update_group_users:any
  
  new_channel_name:any
  new_channel_group:any
  new_channel_users:any
  
  update_channel_users:any
  update_channel_name:any
  update_channel_id:any
  update_channel_group
  
  settings_channels_list
  
  
  constructor(private mongo:MongoService, private methods:MethodsService, private authguard:AuthguardService) { }

  ngOnInit() {
    this.authguard.canActivate()
    this.auth_role = this.authguard.check_role(this.mongo.user_role)
    console.log(this.auth_role)
    this.get_users()
    this.get_groups()
    this.get_channels()
  }
//=====Users=======/
  get_users(msg = null){
    console.log(msg)
    this.mongo.get_users().subscribe((users => this.make_user_list(users)));
  }
  
  new_user(event){
    event.preventDefault();
    this.create_user(this.new_username, this.new_password, this.new_role)
  }
  
  create_user(username, password, role){
    var data = {
      username : username,
      password : password,
      role : role
    }
    this.mongo.new_user(data).subscribe((userDetails => this.get_users(userDetails)))
    this.users.push(data)    
  }
  
  update_user(id, username, password, role){
    this.update_username = username
    this.update_password = password
    this.update_role = role
    this.update_id = id
    console.log("update user", id)
  }
  
  confirm_update(event){
    event.preventDefault()
    var data = {
      id : this.update_id,
      username : this.update_username,
      password : this.update_password,
      role : this.update_role
    }
    this.mongo.update_user(data).subscribe((update => this.get_users(update)))
  }
  
  remove_user(user_id){
    var data = {
      id : user_id
    }
    this.mongo.remove_user(data).subscribe((messages => this.get_users(messages)))
  }  
  
//=====Groups====================

  get_groups(msg = null){
    console.log(msg)
    this.mongo.load_groups().subscribe((groups => this.create_group_list(groups)));
  }


  new_group(){
    
    var data = {
      group_name: this.new_group_name,
      group_admins: this.mongo.user_name
    }
    console.log(data)
    this.mongo.add_group(data).subscribe((messages => this.get_groups(messages)))
  }
  
  
  update_group(id, group_name, group_admins, group_users){
    console.log("update group", id, group_name, group_admins, group_users)
    this.update_group_id = id
    this.update_group_name = group_name
    this.update_group_admins = group_admins
    this.update_group_users = group_users
    console.log("update group", id)
  }   

  //Some of this belongs in channel!!!
  confirm_update_group(event){
    event.preventDefault()
    var grp = this.update_group_admins.toString()
    var usr = this.update_group_users.toString()
    grp = grp.split(',')
    usr = usr.split(',')
    var id = this.update_group_id
    var grp_arr = []
    var usr_arr = []
    for(var i = 0; i < grp.length; i++){
      grp_arr.push(grp[i])
    }
    for(var i = 0; i < usr.length; i++){
      usr_arr.push(usr[i])
    }
    var data = {
      id : id,
      group_name : this.update_group_name,
      group_admins : grp_arr,
      group_users : usr_arr
    }
    console.log("UPDATING GROUP: ", data)
      this.user_exists(usr_arr)
      this.mongo.update_group(data).subscribe((update => this.get_groups(update)))
    //this might race

  }

  remove_group(group_id){
    var data = {
      id : group_id
    }
    this.mongo.remove_group(data).subscribe((messages => this.get_groups(messages)))
  }



//========Channels=========================/


  get_channels(msg = null){
    console.log(msg)
    this.mongo.load_channels().subscribe((channels => this.create_channel_list(channels)));
  }
  
  update_channel(id, channel_name, group_id, group_users){
    console.log("update channel", id, channel_name, group_id, group_users)
    this.update_channel_name = channel_name
    this.update_channel_id = id
    this.update_channel_group = group_id
    this.update_channel_users = group_users
    console.log("update user", id)
  }  
  
  confirm_update_channel(event){
    event.preventDefault()
    var usr = this.update_channel_users.toString()
    usr = usr.split(',')
    var usr_arr = []
    for(var i = 0; i < usr.length; i++){
      usr_arr.push(usr[i])
    }
    var data = {
      id : this.update_channel_id,
      channel_name : this.update_channel_name,
      group_id : this.update_channel_group,
      channel_users : usr_arr
    }
    console.log("Updating channel: ", data)
      this.user_exists(usr_arr)
      this.mongo.update_channel(data).subscribe((update => this.get_channels(update)))
    //this might race

  }
  
  new_channel(){
    
    var data = {
      channel_name: this.new_channel_name,
      group_id: this.new_channel_group,
      channel_users: this.new_channel_users
    }
    console.log(data)
    this.mongo.add_channel(data).subscribe((messages => this.get_channels(messages)))
  }
  
  create_list(messages){
    var message = JSON.parse(messages._body)
    console.log(message.message)
    this.settings_channels_list = message.message
    this.methods.callComponentMethod();
  }
  
  user_exists(users){
    var arr = []
    for (var i = 0 ; i < this.mongo.user_list.length; i++){
      arr.push(this.mongo.user_list[i].username)
    }
    for(var i = 0 ; i < users.length; i++){
      console.log(arr)
      if (!arr.includes(users[i])){
        console.log("USER NOT EXISTS")
        this.create_user(users[i], "123", "user")
      }
    }
  }
  
  remove_channel(channel_id){
    var data = {
      id : channel_id
    }
    this.mongo.remove_channel(data).subscribe((messages => this.get_channels(messages)))
  }







//=====Helper functions=====
  create_group_list(messages){
    var message = JSON.parse(messages._body)
    console.log(message.message)
    this.settings_group_list = message.message
    this.methods.callComponentMethod();
  }
  
  
  create_channel_list(messages){
    var message = JSON.parse(messages._body)
    console.log(message.message)
    this.settings_channels_list = message.message
    this.methods.callComponentMethod();
  } 
  
  make_user_list(users){
    var dat = JSON.parse(users._body)
    this.mongo.user_list = dat.message;
    this.users = dat.message;
    console.log("USERS",dat.message)
  }
}