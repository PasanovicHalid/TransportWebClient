import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { SignUpComponent } from './authentification/sign-up/sign-up.component';
import { LoginComponent } from './authentification/login/login.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';
import { DashboardComponent } from './landing-pages/dashboard/dashboard.component';
import { EmployeeDashboardComponent } from './employee-management/employee-dashboard/employee-dashboard.component';
import { EmployeeInfoComponent } from './employee-management/employee-info/employee-info.component';
import { AddNewEmployeeComponent } from './employee-management/add-new-employee/add-new-employee.component';
import { AssignTruckToDriverComponent } from './employee-management/assign-truck-to-driver/assign-truck-to-driver.component';
import { VehicleDashboardComponent } from './vehicle-management/vehicle-dashboard/vehicle-dashboard.component';
import { TrailerTableComponent } from './vehicle-management/trailer-table/trailer-table.component';
import { VanTableComponent } from './vehicle-management/van-table/van-table.component';
import { TruckTableComponent } from './vehicle-management/truck-table/truck-table.component';
import { TruckInfoComponent } from './vehicle-management/truck-table/truck-info/truck-info.component';
import { VanInfoComponent } from './vehicle-management/van-table/van-info/van-info.component';
import { TrailerInfoComponent } from './vehicle-management/trailer-table/trailer-info/trailer-info.component';
import { AddTruckComponent } from './vehicle-management/add-truck/add-truck.component';
import { AddVanComponent } from './vehicle-management/add-van/add-van.component';
import { AddTrailerComponent } from './vehicle-management/add-trailer/add-trailer.component';
import { RouteDashboardComponent } from './route-management/route-dashboard/route-dashboard.component';
import { RouteInfoComponent } from './route-management/route-info/route-info.component';
import { AddRouteComponent } from './route-management/add-route/add-route.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signUp', component: SignUpComponent }
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      
      { path: 'employee-dashboard', component: EmployeeDashboardComponent },
      { path: 'employee-dashboard/employee-info/:id', component: EmployeeInfoComponent },
      { path: 'employee-dashboard/add-new-employee', component: AddNewEmployeeComponent },
      { path: 'employee-dashboard/assign-truck-to-driver/:id', component: AssignTruckToDriverComponent },

      { 
        path: 'vehicle-dashboard', 
        component: VehicleDashboardComponent,
        children: [
          { path: 'trailers', component: TrailerTableComponent },
          { path: 'vans', component: VanTableComponent },
          { path: 'trucks', component: TruckTableComponent },
        ]
      },
      { path: 'vehicle-dashboard/truck-info/:id', component: TruckInfoComponent },
      { path: 'vehicle-dashboard/van-info/:id', component: VanInfoComponent },
      { path: 'vehicle-dashboard/trailer-info/:id', component: TrailerInfoComponent },
      { path: 'vehicle-dashboard/add-new-truck', component: AddTruckComponent },
      { path: 'vehicle-dashboard/add-new-van', component: AddVanComponent },
      { path: 'vehicle-dashboard/add-new-trailer', component: AddTrailerComponent },

      { path: 'route-dashboard', component:  RouteDashboardComponent},
      { path: 'route-dashboard/route-info/:id', component:  RouteInfoComponent},
      { path: 'route-dashboard/add-route', component:  AddRouteComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
