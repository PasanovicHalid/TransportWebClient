import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterAdministratorRequest } from '../contracts/requests/register-administrator-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/company/"

  constructor(private http: HttpClient) { }

  registerAdministator(registerAdministratorRequest: RegisterAdministratorRequest) : Observable<unknown> {
    return this.http.post(
      this.basePath + "register/admin",
      registerAdministratorRequest.employeeInfo,
      {
        headers: this.headers
      });
  }

  registerDriver(registerDriverRequest: RegisterAdministratorRequest) : Observable<unknown> {
    return this.http.post(
      this.basePath + "register/driver",
      registerDriverRequest.employeeInfo,
      {
        headers: this.headers
      });
  }
}
