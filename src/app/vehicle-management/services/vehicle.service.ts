import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TruckPageRequest } from '../contracts/requests/truck-page-request';
import { VanPageRequest } from '../contracts/requests/van-page-request';
import { TrailerPageRequest } from '../contracts/requests/trailer-page-request';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/common-code/interfaces/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/vehicle/"

  constructor(private http: HttpClient) { }

  getTrucks(request: TruckPageRequest) : Observable<PaginationResponse> {
    return this.http.post<PaginationResponse>(
      this.basePath + "truck/page",
      request,
      { 
        headers: this.headers 
      });
  }

  getVans(request: VanPageRequest): Observable<PaginationResponse> {
    return this.http.post<PaginationResponse>(
      this.basePath + "van/page",
      request,
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
}
