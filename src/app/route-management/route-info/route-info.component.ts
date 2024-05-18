import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddRouteRequest } from '../contracts/requests/add-route-request';
import { TransportationInfo } from 'src/app/model/entities/transportation-info';
import { UpdateRouteInfoRequest } from '../contracts/requests/update-route-info-request';
import { AddResolutionRequest } from '../contracts/requests/add-resolution-request';
import { TransportationService } from 'src/app/services/transportation.service';
import { EmployeeInfo } from 'src/app/model/entities/employee-info';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-route-info',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.scss']
})
export class RouteInfoComponent implements OnInit {
  routeId: number;
  data: TransportationInfo = new TransportationInfo();
  resolutionData : AddResolutionRequest = new AddResolutionRequest();
  driverOptions : EmployeeInfo[] = [];
  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private transportationService: TransportationService,
    private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute)
    {
      const routeIdFromRoute = this.route.snapshot.paramMap.get('id') ?? '';
      this.routeId = parseInt(routeIdFromRoute);
    }

  ngOnInit(): void {
    this.transportationService.getTransportationById(this.routeId).subscribe({
      next: (response) => {
        this.data = response;
        this.resolutionData = new AddResolutionRequest().fromTransportationInfo(this.data);
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });

    this.companyService.getDriversByCompany().subscribe({
      next: (response) => {
        this.driverOptions = response;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  public changeRouteInfo() {
    let updateData : UpdateRouteInfoRequest = new UpdateRouteInfoRequest().fromTransportationInfo(this.data);

    this.transportationService.changeBasicInfoTransportation(updateData).subscribe({
      next: () => {
        this.toastr.success("Route changed successfully!");
        this.router.navigate(['/route-dashboard']);
      },
      error: (error) => {
        if(error.status == 400){
          this.AssingErrorsToMap(error);
        }
        this.toastr.error(error.error.title);
      }
    });
  }

  public addResolution() {
    this.transportationService.addResolution(this.resolutionData).subscribe({
      next: () => {
        this.toastr.success("Resolution added/changed successfully!");
        this.router.navigate(['/route-dashboard']);
      },
      error: (error) => {
        if(error.status == 400){
          this.AssingErrorsToMap(error);
        }
        this.toastr.error(error.error.title);
      }
    });
  }

  public deleteRoute() {
    this.transportationService.deleteTransportation(this.routeId).subscribe({
      next: () => {
        this.toastr.success("Route deleted successfully!");
        this.router.navigate(['/route-dashboard']);
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  private AssingErrorsToMap(error: any) {
    const errorMap = new Map<string, string>();
    for (const [key, value] of Object.entries(error.error.errors)) {
      errorMap.set(key.toLowerCase(), value as string);
    }
    this.ErrorMap = errorMap;
  }
}
