import { Component } from '@angular/core';
import { LoginRequest } from '../contracts/requests/login-request';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginRequest : LoginRequest = new LoginRequest();

  constructor(private authService: AuthentificationService,
    private toastr: ToastrService,
    private router: Router) { }

  onSubmit() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        this.authService.AddTokenWithDecodedPayloadToLocalStorage(response.token);

        if(this.authService.isDriver() || this.authService.isSuperAdmin()) {
          this.toastr.error("Not implemented yet!");
          return;
        }

        this.router.navigate(['/dashboard']);

      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.title);
      }
    });
  }

}
