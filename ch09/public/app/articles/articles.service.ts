/**
 * Created by dpitic on 6/03/17.
 * Angular module injectable service for Article.
 */
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestMethod, Response } from '@angular/http';

@Injectable()
export class ArticlesService {
    private _baseURL = 'api/articles';      // API base URL

    constructor (private _http: Http) {}

    // Accepts an article object and send it to the server using HTTP POST req.
    create(article: any): Observable<any> {
        return this._http
            .post(this._baseURL, article)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    // Accepts an Article ID string and asks for an Article object from the
    // server using a HTTP GET request.
    read(articleId: string): Observable<any> {
        return this._http
            .get(`${this._baseURL}/${articleId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    // Accepts an Article object and sends it to the server for an update using
    // a HTTP PUT request.
    update(article: any): Observable<any> {
        return this._http
            .put(`${this._baseURL}/${article._id}`, article)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    // Accepts an Article ID string and tries to delete it using a HTTP DELETE
    // request
    delete(articleId: any): Observable<any> {
        return this._http
            .delete(`${this._baseURL}/${articleId}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    list(): Observable<any> {
        return this._http
            .get(this._baseURL)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    // Error handling method to deal with server errors
    private handleError(error: Response) {
        return Observable.throw(error.json().message || 'Server error');
    }
}