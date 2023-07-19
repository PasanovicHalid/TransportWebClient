import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginationResponse } from 'src/app/common-code/interfaces/pagination-response';
import { TransportationPageRequest } from '../route-management/contracts/requests/transportation-page-request';
import { Observable } from 'rxjs';
import { AddRouteRequest } from '../route-management/contracts/requests/add-route-request';
import { TransportationInfo } from 'src/app/model/entities/transportation-info';
import { UpdateRouteInfoRequest } from '../route-management/contracts/requests/update-route-info-request';
import { AddResolutionRequest } from '../route-management/contracts/requests/add-resolution-request';
import { TransportationDashboardResponse } from '../route-management/contracts/response/transportation-dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/transportation/"

  constructor(private http: HttpClient) { }

  public getTransportations(request: TransportationPageRequest): Observable<PaginationResponse> {
    return this.http.post<PaginationResponse>(
      this.basePath + "page",
      request,
      {
        headers: this.headers
      });
  }

  public getTransportationById(id: number): Observable<TransportationInfo> {
    return this.http.get<TransportationInfo>(
      this.basePath + `${id}`,
      {
        headers: this.headers
      });
  }

  public addTransportation(data: AddRouteRequest): Observable<unknown> {
    return this.http.post(
      this.basePath + "create",
      data,
      {
        headers: this.headers
      });
  }

  public changeBasicInfoTransportation(data: UpdateRouteInfoRequest): Observable<unknown> {
    return this.http.patch(
      this.basePath + `${data.id}`,
      data,
      {
        headers: this.headers
      });
  }

  addResolution(resolutionData: AddResolutionRequest) : Observable<unknown> {
    return this.http.post(
      this.basePath + `${resolutionData.transportationId}/resolution`,
      resolutionData,
      {
        headers: this.headers
      });
  }

  deleteTransportation(routeId: number) : Observable<unknown> {
    return this.http.delete(
      this.basePath + `${routeId}`,
      {
        headers: this.headers
      });
  }

  getTransportationDashboardInfo() : Observable<TransportationDashboardResponse> {
    return this.http.get<TransportationDashboardResponse>(
      this.basePath + "dashboard",
      {
        headers: this.headers
      });
  }
}
