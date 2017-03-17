/**
 * Created by dpitic on 6/03/17.
 * Article component.
 */
import { Component } from '@angular/core';
import {ArticlesService} from "./articles.service";
// import Article Service

@Component({
    selector: 'articles',
    template: '<router-outlet></router-outlet>',
    providers: [ ArticlesService ]
})
export class ArticlesComponent {}