import { Component, Input } from '@angular/core';
import Movie from '../models/Movie';

@Component({
    selector: 'movie',
    templateUrl: './movie.template.html'
})
export class MovieComponent {
    @Input() movie:Movie;
}