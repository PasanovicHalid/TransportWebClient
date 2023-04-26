import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { SignUpComponent } from './authentification/sign-up/sign-up.component';
import { LoginComponent } from './authentification/login/login.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';
import { DashboardComponent } from './landing-pages/dashboard/dashboard.component';
import { EmployeeDashboardComponent } from './employee-management/employee-dashboard/employee-dashboard.component';

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
      { path: 'test', component: LoginComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
