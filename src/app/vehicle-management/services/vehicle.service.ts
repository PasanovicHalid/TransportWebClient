import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TruckPageRequest } from '../contracts/requests/truck-page-request';
import { VanPageRequest } from '../contracts/requests/van-page-request';
import { TrailerPageRequest } from '../contracts/requests/trailer-page-request';
import { Observable } from 'rxjs';
import { PaginationResponse } from 'src/app/common-code/interfaces/pagination-response';
import { AddTruckRequest } from '../contracts/requests/add-truck-request';
import { AddVanRequest } from '../contracts/requests/add-van-request';
import { VanInfo } from '../model/van-info';
import { TruckInfo } from '../model/truck-info';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/vehicle/"

  constructor(private http: HttpClient) { }

  registerTruck(truckInfo: AddTruckRequest) : Observable<unknown> {
    return this.http.post(
      this.basePath + "truck",
      truckInfo,
      { 
        headers: this.headers 
      });
  }

  registerVan(vanInfo: AddVanRequest) : Observable<unknown> {
    return this.http.post(
      this.basePath + "van",
      vanInfo,
      { 
        headers: this.headers 
      });
  }

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

  updateVan(vanInfo: AddVanRequest) : Observable<unknown> {
    return this.http.put(
      this.basePath + "van/" + vanInfo.id,
      vanInfo,
      { 
        headers: this.headers 
      });
  }

  getVanById(vanId: number) : Observable<VanInfo> {
    return this.http.get<VanInfo>(
      this.basePath + "van/" + vanId,
      { 
        headers: this.headers 
      });
  }

  deleteVan(id: number) : Observable<unknown> {
    return this.http.delete(
      this.basePath + "van/" + id,
      { 
        headers: this.headers 
      });
  }

  getTruckById(truckId: number) : Observable<TruckInfo> {
    return this.http.get<TruckInfo>(
      this.basePath + "truck/" + truckId,
      { 
        headers: this.headers 
      });
  }

  deleteTruck(id: number) : Observable<unknown> {
    return this.http.delete(
      this.basePath + "truck/" + id,
      {
        headers: this.headers
      });
  }
  updateTruck(truckInfo: TruckInfo) : Observable<unknown> {
    return this.http.put(
      this.basePath + "truck/" + truckInfo.id,
      truckInfo,
      {
        headers: this.headers
      });
  }
}
