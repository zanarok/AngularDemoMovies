import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieListCompotent } from './components/movie-list.component';
import { MovieComponent } from './components/movie.component';
import { FilterComponent } from './components/filter.component';
import { StarRatingComponent } from './components/star-rating.component';

import TmdbApiService from './services/tmdb-api.service';


@NgModule({
  declarations: [
    AppComponent,
    MovieListCompotent,
    MovieComponent,
    StarRatingComponent,
    FilterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [TmdbApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
