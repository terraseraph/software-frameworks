import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SettingsComponent } from './settings/settings.component';
import { SocketService } from './socket.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    MenuComponent,
    RoomsListComponent,
    ChatRoomComponent,
    SettingsComponent,
  ],
  imports: [
        RouterModule.forRoot([
      {"path":"login", "component":LoginComponent},
      {"path":"main", "component":MainComponent},
      {"path":"menu", "component":MenuComponent},
      {"path":"rooms", "component":RoomsListComponent},
      {"path":"settings", "component":SettingsComponent},
      {"path":"chat-room/:id/:name", "component":ChatRoomComponent}
    ]),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }