import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularMaterialModule } from '../library-modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter() {
  return localStorage.getItem("jwt")
}

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
  ]
})
export class AuthentificationModule { }
