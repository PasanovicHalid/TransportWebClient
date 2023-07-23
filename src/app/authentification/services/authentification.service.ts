import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest } from '../contracts/requests/login-request';
import { Observable } from 'rxjs';
import { AuthentificationResponse } from '../contracts/responses/authentification-response';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/authentication/"

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginRequest : LoginRequest) : Observable<AuthentificationResponse> {
    return this.http.post<AuthentificationResponse>(
      this.basePath + "login", 
      loginRequest, 
      { 
        headers: this.headers 
      });
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  isAuthenticated() : boolean {
    const token = localStorage.getItem("jwt");
    return !this.jwtHelper.isTokenExpired(token);
  }

  AddTokenWithDecodedPayloadToLocalStorage(token: string) : void | null {
    const decodedToken = this.jwtHelper.decodeToken(token);
    
    if(decodedToken == null) {
      return null;
    }

    localStorage.setItem("jwt", token);
    localStorage.setItem("role", decodedToken["role"]);
  }

  GetRoleFromLocalStorage() : string | null {
    return localStorage.getItem("role");
  }

  isAdministrator() : boolean {
    const role = this.GetRoleFromLocalStorage();
    return role == "Admin";
  }

  isDriver() : boolean {
    const role = this.GetRoleFromLocalStorage();
    return role == "Driver";
  }

  isSuperAdmin() : boolean {
    const role = this.GetRoleFromLocalStorage();
    return role == "SuperAdmin";
  }

  RemoveTokenFromLocalStorage() {
    localStorage.removeItem("jwt");
  }
}
