import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public assignVehicle(id: number, vehicleId : number) : Observable<unknown> {
    return this.http.post(
      this.basePath + `${id}/assign-vehicle/${vehicleId}`,
      {
        headers: this.headers
      });
  }

  public unassignVehicle(id: number) : Observable<unknown> {
    return this.http.post(
      this.basePath + `${id}/unassign-vehicle`,
      {
        headers: this.headers
      });
  }
}
