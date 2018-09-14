import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {"path":"main", "component":MainComponent}
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
