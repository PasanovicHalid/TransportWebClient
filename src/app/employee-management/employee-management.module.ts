import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CommonCodeModule } from '../common-code/common-code.module';
import { EmptyPipe } from '../common-code/pipes/empty-pipe';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';



@NgModule({
  declarations: [
    EmployeeDashboardComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    CommonCodeModule,
    CanvasJSAngularChartsModule,
  ]
})
export class EmployeeManagementModule { }
