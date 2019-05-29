import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import Genre from '../models/Genre';
import Movie from '../models/Movie';

import { Observable, forkJoin } from 'rxjs';
import { map } from "rxjs/operators";


@Injectable()
export default class TmdbApiService {
    private data:Array<Movie>;

    constructor(private http:HttpClient){
    }
    //fork join pt mai multe observables

    public getData(): Observable<Array<Movie>>{
        return Observable.create((observer:any) => {
            if(this.data){
                console.log("cached movie data");

                observer.next(this.data);
                observer.complete();
            }
            else{
                forkJoin(this.getGenres(), this.getNowPlayingMovies())
                .subscribe(res => {
                    //set genre names
                    res[1].map(m => {
                        m.genres.map(g => {
                            g.name = res[0].find(x => x.id === g.id).name
                        })
                    });
                    
                    this.data = res[1];

                    console.log("movie data retrieved from api");

                    observer.next(this.data);
                    observer.complete();
                })
            }
        });
    }

    public getDataFilteredAndSorted(minimumRating:number):Observable<Array<Movie>>{
        return Observable.create((observer:any) => {
            this.getData().subscribe(retrievedMovies => {
                observer.next(retrievedMovies
                    .sort((a,b) => b.popularity - a.popularity)
                    .filter(m => m.voteAverage > minimumRating)
                );
                observer.complete();
            });
        });

    }

    private getNowPlayingMovies():Observable<Array<Movie>>{
        return this.http.get(environment.apiBaseUrl + "movie/now_playing?api_key=" + environment.apiKey + "&language=" + environment.language)
            .pipe(map((data: any) => {
                return data.results.map(m => {
                    let movie = new Movie();

                    movie.id = m.id;
                    movie.title = m.title;
                    movie.originalTitle = m.original_title;
                    movie.overview = m.overview;
                    movie.originalLanguage = m.original_language;
                    movie.voteCount = m.vote_count;
                    movie.voteAverage = m.vote_average;
                    movie.popularity = m.popularity;
                    movie.imageUrl = this.determineImageUrl(m.poster_path, "big");
                    movie.backdropImageUrl = this.determineImageUrl(m.backdrop_path, "big");
                    movie.adult = m.adult;
                    movie.hasVideo = m.video;
                    movie.releaseDate = m.release_date;
                    movie.genres = m.genre_ids.map(x => {
                        let genre = new Genre();
                        genre.id = x;
                        return genre;
                    });

                    return movie;
                });
            }));;
    }

    private getGenres(): Observable<Array<Genre>> {
        return this.http.get(`${environment.apiBaseUrl}genre/movie/list?api_key=${environment.apiKey}&language=${environment.language}`)
            .pipe(map((data: any) => {
                return data.genres.map(g => {
                    let genre = new Genre();

                    genre.id = g.id;
                    genre.name = g.name;

                    return genre;
                });
            }));
    }

    private determineImageUrl(posterPath:string, size:string){
        return environment.imageBaseUrl + environment.imageSizes[size] + "/" + posterPath;
    }
}
