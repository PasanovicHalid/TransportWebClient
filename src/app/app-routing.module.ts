import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { LoginComponent } from './authentification/login/login.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';
import { DashboardComponent } from './landing-pages/dashboard/dashboard.component';
import { EmployeeDashboardComponent } from './employee-management/employee-dashboard/employee-dashboard.component';
import { EmployeeInfoComponent } from './employee-management/employee-info/employee-info.component';
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
import { AddNewAdministratorComponent } from './employee-management/add-new-administrator/add-new-administrator.component';
import { AddNewDriverComponent } from './employee-management/add-new-driver/add-new-driver.component';
import { AuthGuard } from './guards/auth.gard';
import { AdminInfoComponent } from './employee-management/admin-info/admin-info.component';
import { DriverInfoComponent } from './employee-management/driver-info/driver-info.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      
      { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [AuthGuard] },
      { path: 'employee-dashboard/admin-info/:id', component: AdminInfoComponent, canActivate: [AuthGuard] },
      { path: 'employee-dashboard/driver-info/:id', component: DriverInfoComponent, canActivate: [AuthGuard] },
      { path: 'employee-dashboard/assign-truck-to-driver/:id', component: AssignTruckToDriverComponent, canActivate: [AuthGuard] },
      { path: 'employee-dashboard/add-new-administrator', component: AddNewAdministratorComponent, canActivate: [AuthGuard]},
      { path: 'employee-dashboard/add-new-driver', component: AddNewDriverComponent, canActivate: [AuthGuard]},

      { 
        path: 'vehicle-dashboard', 
        component: VehicleDashboardComponent,
        children: [
          { path: 'trailers', component: TrailerTableComponent },
          { path: 'vans', component: VanTableComponent },
          { path: 'trucks', component: TruckTableComponent },
        ], 
        canActivate: [AuthGuard]
      },
      { path: 'vehicle-dashboard/truck-info/:id', component: TruckInfoComponent, canActivate: [AuthGuard] },
      { path: 'vehicle-dashboard/van-info/:id', component: VanInfoComponent, canActivate: [AuthGuard] },
      { path: 'vehicle-dashboard/trailer-info/:id', component: TrailerInfoComponent, canActivate: [AuthGuard] },
      { path: 'vehicle-dashboard/add-new-truck', component: AddTruckComponent, canActivate: [AuthGuard] },
      { path: 'vehicle-dashboard/add-new-van', component: AddVanComponent, canActivate: [AuthGuard] },
      { path: 'vehicle-dashboard/add-new-trailer', component: AddTrailerComponent, canActivate: [AuthGuard] },

      { path: 'route-dashboard', component:  RouteDashboardComponent, canActivate: [AuthGuard]},
      { path: 'route-dashboard/route-info/:id', component:  RouteInfoComponent, canActivate: [AuthGuard]},
      { path: 'route-dashboard/add-route', component:  AddRouteComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
