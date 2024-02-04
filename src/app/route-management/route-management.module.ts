import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteDashboardComponent } from './route-dashboard/route-dashboard.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { CommonCodeModule } from "../common-code/common-code.module";

@NgModule({
    declarations: [
        RouteDashboardComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        RouterModule,
        CommonCodeModule
    ]
})
export class RouteManagementModule { }
