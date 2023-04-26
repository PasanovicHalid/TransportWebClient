import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavComponent } from './nav/nav.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AdminSideNavComponent,
    SideNavComponent,
    NavComponent,
    AdminNavComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule, 
    RouterModule
  ],
  exports: [
    AdminSideNavComponent,
    SideNavComponent,
    NavComponent,
    AdminNavComponent,
  ]
})
export class NavsModule { }
