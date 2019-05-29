import { Component, Input } from '@angular/core';
import Movie from '../models/Movie';

@Component({
    selector: 'movie',
    templateUrl: './movie.template.html',
    styleUrls: ['./movie.style.scss']
})
export class MovieComponent {
    @Input() movie:Movie;
}