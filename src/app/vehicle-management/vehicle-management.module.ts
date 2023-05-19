import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDashboardComponent } from './vehicle-dashboard/vehicle-dashboard.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { VanTableComponent } from './van-table/van-table.component';
import { TruckTableComponent } from './truck-table/truck-table.component';
import { TrailerTableComponent } from './trailer-table/trailer-table.component';
import { AddVanComponent } from './add-van/add-van.component';
import { AddTruckComponent } from './add-truck/add-truck.component';
import { AddTrailerComponent } from './add-trailer/add-trailer.component';
import { TrailerInfoComponent } from './trailer-table/trailer-info/trailer-info.component';
import { TruckInfoComponent } from './truck-table/truck-info/truck-info.component';
import { VanInfoComponent } from './van-table/van-info/van-info.component';



@NgModule({
  declarations: [
    VehicleDashboardComponent,
    VanTableComponent,
    TruckTableComponent,
    TrailerTableComponent,
    AddVanComponent,
    AddTruckComponent,
    AddTrailerComponent,
    TrailerInfoComponent,
    TruckInfoComponent,
    VanInfoComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class VehicleManagementModule { }
