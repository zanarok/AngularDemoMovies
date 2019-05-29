import { Component, Input } from '@angular/core';
import TmdbApiService from '../services/tmdb-api.service';
import Movie from '../models/Movie';

@Component({
    selector: 'listofmovies',
    template: `
    <div class="container">
        <div class="title">Movies Now Playing</div>
        <div class="listContainer" *ngIf="movies.length > 0 else elseBlock">
            <movie *ngFor="let movie of movies" [movie]="movie"></movie>
        </div>
        <ng-template #elseBlock>
            <div class="noItemsMessage">There are no movies for which the selected criteria are true</div>
        </ng-template>
    </div>
    `
})
export class MovieListCompotent {
    private movies = new Array<Movie>();
    private minimumRating = 3;

    constructor(private service: TmdbApiService) {
    }

    public ngOnInit(): void {
        this.getMovies();
    }

    private getMovies(): void{
        this.service.getDataFilteredAndSorted(this.minimumRating).subscribe(retrievedFilteredMovies => {
            this.movies = retrievedFilteredMovies;
        });
    }
}