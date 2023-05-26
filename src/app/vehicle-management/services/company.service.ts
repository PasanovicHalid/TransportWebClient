import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTruckRequest } from '../contracts/requests/add-truck-request';
import { AddVanRequest } from '../contracts/requests/add-van-request';
import { AddTrailerRequest } from '../contracts/requests/add-trailer-request';
import { UpdateTrailerRequest } from '../contracts/requests/update-trailer-request';
import { TrailerInfo } from '../model/trailer-info';
import { TrailerPageRequest } from '../contracts/requests/trailer-page-request';
import { PaginationResponse } from 'src/app/common-code/interfaces/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  basePath: string = "/api/company/"

  constructor(private http: HttpClient) { }

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

}
