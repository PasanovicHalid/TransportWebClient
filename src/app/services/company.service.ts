import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterAdministratorRequest } from '../employee-management/contracts/requests/register-administrator-request';
import { Observable } from 'rxjs';
import { PaginationResponse } from '../common-code/interfaces/pagination-response';
import { TrailerInfo } from '../model/entities/trailer-info';
import { AddTrailerRequest } from '../vehicle-management/contracts/requests/add-trailer-request';
import { TrailerPageRequest } from '../vehicle-management/contracts/requests/trailer-page-request';
import { UpdateTrailerRequest } from '../vehicle-management/contracts/requests/update-trailer-request';
import { EmployeeInfo } from '../model/entities/employee-info';

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

  registerTrailer(trailerInfo: AddTrailerRequest) : Observable<unknown> {
    return this.http.post(
      this.basePath + "trailer",
      trailerInfo,
      { 
        headers: this.headers 
      });
  }

  updateTrailer(trailerInfo: UpdateTrailerRequest) : Observable<unknown> {
    return this.http.put(
      this.basePath + "trailer/" + trailerInfo.id,
      trailerInfo,
      { 
        headers: this.headers 
      });
  }

  deleteTrailer(trailerId: number) : Observable<unknown> {
    return this.http.delete(
      this.basePath + "trailer/" + trailerId,
      { 
        headers: this.headers 
      });
  }

  getTrailerInfo(trailerId: number) : Observable<TrailerInfo> {
    return this.http.get<TrailerInfo>(
      this.basePath + "trailer/" + trailerId,
      { 
        headers: this.headers 
      });
  }

  getTrailers(request: TrailerPageRequest): Observable<PaginationResponse> {
    return this.http.post<PaginationResponse>(
      this.basePath + "trailer/page",
      request,
      { 
        headers: this.headers 
      });
  }

  getDriversByCompany(): Observable<EmployeeInfo[]> {
    return this.http.get<EmployeeInfo[]>(
      this.basePath + "drivers-by-company",
      { 
        headers: this.headers 
      });
  }
}
