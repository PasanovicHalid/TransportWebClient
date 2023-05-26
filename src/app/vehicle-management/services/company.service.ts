import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTruckRequest } from '../contracts/requests/add-truck-request';
import { AddVanRequest } from '../contracts/requests/add-van-request';
import { AddTrailerRequest } from '../contracts/requests/add-trailer-request';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/company/"

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

  registerTrailer(trailerInfo: AddTrailerRequest) : Observable<unknown> {
    return this.http.post(
      this.basePath + "trailer",
      trailerInfo,
      { 
        headers: this.headers 
      });
  }

}
