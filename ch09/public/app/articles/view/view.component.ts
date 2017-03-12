/**
 * Created by dpitic on 6/03/17.
 * View component responsible for presenting a single article. It contains a set
 * of buttons that are visible to the article creator, which allow the creator
 * to delete the article, or navigate to the edit route.
 */
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ArticlesService} from '../articles.service';

@Component({
    selector: 'view',
    templateUrl: 'app/articles/view/view.template.html',
})
export class ViewComponent {
    user: any;
    article: any;
    paramsObserver: any;
    errorMessage: string;
    allowEdit: boolean = false;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _authenticationService: AuthenticationService,
                private _articlesService: ArticlesService) {
    }

    ngOnInit() {
        this.user = this._authenticationService.user;

        this.paramsObserver = this._route.params.subscribe(params => {
            let articleId = params['articleId'];

            this._articlesService
                .read(articleId)
                .subscribe(
                    article => {
                        this.article = article;
                        this.allowEdit = (this.user && this.user._id === this.article.creator._id);
                    },
                    error => this._router.navigate(['/articles'])
                );
        });
    }

    ngOnDestroy() {
        this.paramsObserver.unsubscribe();
    }

    delete() {
        this._articlesService
            .delete(this.article._id)
            .subscribe(deletedArticle => this._router.navigate(['/articles']),
                error => this.errorMessage = error);
    }
}