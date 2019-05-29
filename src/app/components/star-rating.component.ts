import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'stars',
    template: `
    <div class="container">
        <div class="starContainer">
            <div *ngFor="let currentRating of possibleRatings" [class]="getClass(currentRating)" (click)="onStarClick(currentRating)"></div>
        </div>
        <div *ngIf="!hideText" class="value">{{rating}}/10</div>
    </div>
    `,
    styleUrls: ["./star-rating.style.scss"] 
})
export class StarRatingComponent {
    @Input() rating:number;
    @Input() clickable:boolean;
    @Input() hideText:boolean;
    @Output() starClick = new EventEmitter<number>();
    public possibleRatings = new Array<number>();

    public ngOnInit(): void {
        this.possibleRatings = new Array<number>();
        for(let k=10;k>=0.5;k-=0.5)
            this.possibleRatings.push(k);
    }

    getClass(currentRating:number):string{
        return `star ${(currentRating * 10) % 10 === 5 ? "left" : "right"} ${currentRating <= this.rating ? "active" : ""} ${this.clickable ? "hover" : ""}`
    }

    getSrc(currentRating:number):string{
        return (currentRating * 10) % 10 === 5 ? "../../assets/svg/star-left.svg" : "../../assets/svg/star-right.svg";
    }

    onStarClick(selectedRating:number){
        this.starClick.emit(selectedRating);
    }
}