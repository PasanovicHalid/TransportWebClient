import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AssignTruckToDriverComponent } from './assign-truck-to-driver/assign-truck-to-driver.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { AddNewDriverComponent } from './add-new-driver/add-new-driver.component';
import { AddNewAdministratorComponent } from './add-new-administrator/add-new-administrator.component';
import { AddEmployeeInfoComponent } from './add-employee-info/add-employee-info.component';
import { CommonCodeModule } from '../common-code/common-code.module';
import { EmptyPipe } from '../common-code/pipes/empty-pipe';
import { AdminInfoComponent } from './admin-info/admin-info.component';
import { DriverInfoComponent } from './driver-info/driver-info.component';



@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    AssignTruckToDriverComponent,
    EmployeeInfoComponent,
    AddNewDriverComponent,
    AddNewAdministratorComponent,
    AddEmployeeInfoComponent,
    AdminInfoComponent,
    DriverInfoComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    CommonCodeModule
  ]
})
export class EmployeeManagementModule { }
