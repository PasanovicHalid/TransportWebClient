import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './library-modules/angular-material.module';
import { AuthentificationModule, tokenGetter } from './authentification/authentification.module';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component';
import { DashboardComponent } from './landing-pages/dashboard/dashboard.component';
import { AdminDashboardComponent } from './landing-pages/admin-dashboard/admin-dashboard.component';
import { LandingPageComponent } from './landing-pages/landing-page/landing-page.component';
import { NavsModule } from './navs/navs.module';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { EmployeeManagementModule } from './employee-management/employee-management.module';
import { VehicleManagementModule } from './vehicle-management/vehicle-management.module';
import { RouteManagementModule } from './route-management/route-management.module';
import { ToastrModule } from 'ngx-toastr';
import { CommonCodeModule } from './common-code/common-code.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    DashboardComponent,
    AdminDashboardComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AuthentificationModule,
    NavsModule,
    CommonCodeModule,
    EmployeeManagementModule,
    VehicleManagementModule,
    RouteManagementModule,
    CanvasJSAngularChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    ToastrModule.forRoot(),
  ],
  providers: [
    JwtHelperService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
