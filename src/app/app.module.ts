import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Core components (eagerly loaded)
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';

// Note: SuggestionsModule et UsersModule sont chargés en LAZY LOADING
// via app-routing.module.ts — ils ne sont PAS importés ici.

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule  // contient les routes lazy pour /suggestions et /users
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
