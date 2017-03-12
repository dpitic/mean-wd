/**
 * Created by dpitic on 28/02/17.
 * Home component used to provide the view for the base root and will present
 * different information for the logged-in and logged-out users.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutes } from './home.routes';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(HomeRoutes),
    ],
    declarations: [
        HomeComponent,
    ]
})
export class HomeModule {}