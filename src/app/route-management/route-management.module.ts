import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRouteComponent } from './add-route/add-route.component';
import { RouteDashboardComponent } from './route-dashboard/route-dashboard.component';
import { RouteInfoComponent } from './route-info/route-info.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../library-modules/angular-material.module';



@NgModule({
  declarations: [
    AddRouteComponent,
    RouteDashboardComponent,
    RouteInfoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class RouteManagementModule { }
