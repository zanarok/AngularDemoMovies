import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieListCompotent } from './components/movie-list.component';
import { MovieComponent } from './components/movie.component';

import TmdbApiService from './services/tmdb-api.service';


@NgModule({
  declarations: [
    AppComponent,
    MovieListCompotent,
    MovieComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [TmdbApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
