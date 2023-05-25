import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeePageRequest } from '../model/employee-page-request';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/common-code/interfaces/pagination-response';
import { GetEmployeeResponse } from '../contracts/response/get-employee-response';
import { EmployeeInfo } from '../model/employee-info';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/employee/"

  constructor(private http: HttpClient) { }

  getEmployees(request: EmployeePageRequest) : Observable<PaginationResponse> {
    return this.http.post<PaginationResponse>(
      this.basePath + "page",
      request,
      {
        headers: this.headers
      });
  }

  getEmployeeById(id: number) : Observable<GetEmployeeResponse> {
    return this.http.get<GetEmployeeResponse>(
      this.basePath + "information/" + id,
      {
        headers: this.headers
      });
  }

  updateEmployee(employeeInfo: EmployeeInfo) {
    return this.http.put(
      this.basePath + "information/" + employeeInfo.id,
      employeeInfo,
      {
        headers: this.headers
      });
  }

}
