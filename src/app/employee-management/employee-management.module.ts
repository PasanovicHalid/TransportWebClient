import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AssignTruckToDriverComponent } from './assign-truck-to-driver/assign-truck-to-driver.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    AssignTruckToDriverComponent,
    AddNewEmployeeComponent,
    EmployeeInfoComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class EmployeeManagementModule { }
