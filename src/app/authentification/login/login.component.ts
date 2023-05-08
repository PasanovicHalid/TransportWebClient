import { Component } from '@angular/core';
import { LoginRequest } from '../contracts/requests/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginRequest : LoginRequest = new LoginRequest();

  constructor() { }

  onSubmit() {
    console.log(this.loginRequest);
  }

}
