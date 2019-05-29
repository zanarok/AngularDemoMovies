import TmdbApiService from "./tmdb-api.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe("Movies Service", () => {
    let service: TmdbApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [TmdbApiService]
        });

        service = TestBed.get(TmdbApiService);
    });

    it("should create an instance", () => {
        expect(service).toBeDefined();
    });

    it("should get movies with genre names populated", () => {       
        let movied = service.getData().subscribe(x => {
            expect(x).toBeDefined();
            expect(x.length).toBeGreaterThan(0);
            x.forEach(movie => {
                expect(movie.genres).toBeDefined();
                movie.genres.forEach(genre => {
                    expect(genre.name.length).toBeGreaterThan(0)
                });
            });
        });
    });

    it("should get movies sorted by pupularity, descending", () => {       
        let movied = service.getDataFilteredAndSorted(0).subscribe(x => {
            expect(x).toBeDefined();
            expect(x.length).toBeGreaterThan(0);

            var lastPopularity = 100000000000000000000;
            x.forEach(movie => {
                expect(movie.popularity).toBeLessThanOrEqual(lastPopularity);
                lastPopularity = movie.popularity;
            });
        });
    });

    it("should get movies filtered by minimum voteAverage", () => {
        var minVoteAverage = 5;       
        let movied = service.getDataFilteredAndSorted(minVoteAverage).subscribe(x => {
            expect(x).toBeDefined();
            expect(x.length).toBeGreaterThan(0);

            x.forEach(movie => {
                expect(movie.voteAverage).toBeGreaterThanOrEqual(minVoteAverage);
            });
        });
    });
});