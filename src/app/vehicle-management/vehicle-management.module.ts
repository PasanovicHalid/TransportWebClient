import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDashboardComponent } from './vehicle-dashboard/vehicle-dashboard.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { CommonCodeModule } from '../common-code/common-code.module';



@NgModule({
  declarations: [
    VehicleDashboardComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    CommonCodeModule
  ]
})
export class VehicleManagementModule { }
