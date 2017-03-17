/**
 * Created by dpitic on 17/03/17.
 * Article service test suite.
 */
import {async, inject, TestBed} from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {
    HttpModule,
    Http,
    XHRBackend,
    Response,
    ResponseOptions
} from '@angular/http';
import {ArticlesService} from './articles.service';

let backend: MockBackend;
let service: ArticlesService;

const mockArticle = {
    title: 'An Article About MEAN',
    content: 'MEAN rocks!',
    creator: {
        fullName: 'John Doe'
    }
};

/*
 * Test suite
 */
describe('Articles service tests', () => {
    beforeEach(async(() => {
        // Configure testing module
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                ArticlesService,
                {provide: XHRBackend, useClass: MockBackend}
            ]
        })
            .compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (_http: Http, _mockBackend: MockBackend) => {
        backend = _mockBackend;
        service = new ArticlesService(_http);
    }));

    it('Should create a single article', done => {
        const options = new ResponseOptions({status: 200, body: mockArticle});
        const response = new Response(options);

        backend.connections.subscribe((c: MockConnection) =>
            c.mockRespond(response));

        service.create(mockArticle).do(article => {
            expect(article).toBeDefined();

            expect(article.title).toEqual(mockArticle.title);
            expect(article.content).toEqual(mockArticle.content);

            done();
        }).toPromise();
    });
});