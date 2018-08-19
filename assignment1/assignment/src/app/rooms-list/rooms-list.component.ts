import { Component, OnInit } from '@angular/core';
import {RouterModule, Routes, Router} from '@angular/router';
import { ChatRoomComponent } from '../chat-room/chat-room.component';
import {ActivatedRoute} from "@angular/router";
import {MongoService} from "../mongo.service";
import {MethodsService} from "../methods.service";

//THIS IS ACTUALLY CHANNELS AND GROUPS LISTINGS!!!!!!
//NEEDS REFACTORING TO REFLECT

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {
  channels_list:any
  groups_list:any
  combined_list:any

  
  constructor(private mongo:MongoService, private router:Router, private methods:MethodsService) {
  }

  ngOnInit() {
    this.load_groups()
    this.methods.componentMethodCalled$.subscribe(
      () => {
        this.load_groups(); console.log("method called")
      }
    );
  }
  
  //click event for room button
  chat_btn(id:any, name:any, users:any){
    this.mongo.channel_user_list = users
    localStorage.setItem("room_id", id)
    console.log("set id: ", id)
    this.router.navigateByUrl(`/chat-room/${id}/${name}`)
  }
  
  
  //pre loading the list of rooms from the db
  load_groups(){
    this.mongo.load_groups()
          .subscribe((groups => this.load_channels(groups) ));     
  }
  
  load_channels(groups){
    this.mongo.load_channels()
          .subscribe((channels => this.create_list(groups, channels) ));    
  }
  
  //creates rooms list for buttons
  create_list(groups, channels){
    groups = JSON.parse(groups._body)
    channels = JSON.parse(channels._body)
    console.log(channels.message, groups.message)
    
    var arr = []
    for (var i = 0; i < groups.message.length; i++){
      var obj = {
          name: groups.message[i].group_name,
          channels : []
      }
      for (var j = 0; j < channels.message.length; j++){
        if(groups.message[i].group_name == channels.message[j].group_id){
          var lst = channels.message[j].channel_users
          if(lst.includes(this.mongo.user_data.username) || this.mongo.user_data.role == 'super_admin' || this.mongo.user_data.role == 'group_admin'){
            obj.channels.push({
              id: channels.message[j]._id,
              name: channels.message[j].channel_name,
              users: channels.message[j].channel_users
            })
          }
        }
      }
      arr.push(obj)
    }
    console.log(arr)
    this.combined_list = arr
    this.groups_list = groups.message
    this.channels_list = channels.message
    this.mongo.groups_list = groups.message
    this.mongo.channels_list = channels.message
  }

}
