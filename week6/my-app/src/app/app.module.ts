import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CanActivate, RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {"path":"main", "component":MainComponent},
      {"path":"chat", "component":ChatComponent}
    ]),    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
