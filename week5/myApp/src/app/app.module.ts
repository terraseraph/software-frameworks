import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TestPageComponent } from './test-page/test-page.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { MenuComponent } from './menu/menu.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    TestPageComponent,
    LoginComponent,
    AccountComponent,
    MenuComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {"path":"test-page", "component":TestPageComponent},
      {"path":"login", "component":LoginComponent},
      {"path":"account", "component":AccountComponent},
      {"path":"details", "component":DetailsComponent}
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
