import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'filter',
    template: `
    <div class="container">
        <label>Minimum Rating:</label>
        <stars [rating]="rating" [clickable]="true" [hideText]="true" (starClick)="handleStarClick($event)"></stars>
    </div>
    `,
    styleUrls: ['./filter.style.scss']
})
export class FilterComponent {
    @Input() rating:number;
    @Output() filterChange = new EventEmitter<number>();
    
    private handleStarClick(selectedRating:number) {
        this.filterChange.emit(selectedRating);
    }
}