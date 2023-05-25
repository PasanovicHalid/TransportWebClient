import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/common-code/interfaces/pagination-response';
import { GetEmployeeResponse } from '../contracts/response/get-employee-response';
import { EmployeePageRequest } from '../model/employee-page-request';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/driver/"

  constructor(private http: HttpClient) { }

  public fireDriver(id: number) : Observable<unknown> {
    return this.http.delete(
      this.basePath + "fire/" + id,
      {
        headers: this.headers
      });
  }
}
