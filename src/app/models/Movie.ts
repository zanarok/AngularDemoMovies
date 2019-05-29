import Genre from './Genre';
export default class Movie {
    public id: number;
    public title: string;
    public voteCount: number;
    public hasVideo: boolean;
    public voteAverage: number;
    public popularity: number;
    public imageUrl:string;
    public originalLanguage:string;
    public originalTitle:string;
    public genres:Array<Genre>;
    public backdropImageUrl:string;
    public adult:boolean;
    public overview:string;
    public releaseDate:Date;
}