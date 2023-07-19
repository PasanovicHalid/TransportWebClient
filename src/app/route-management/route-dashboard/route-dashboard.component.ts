import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouteDataSource } from '../data-sources/route-data-source';
import { Router } from '@angular/router';
import { TransportationPageRequest } from '../contracts/requests/transportation-page-request';
import { Money } from 'src/app/model/value-objects/money';
import { EmployeeInfo } from 'src/app/model/entities/employee-info';
import { TransportationService } from 'src/app/services/transportation.service';
import { TransportationDashboardResponse } from '../contracts/response/transportation-dashboard-response';
@Component({
  selector: 'app-route-dashboard',
  templateUrl: './route-dashboard.component.html',
  styleUrls: ['./route-dashboard.component.scss']
})
export class RouteDashboardComponent implements OnInit {
  displayedColumns: string[] = ['start', 'requiredFor', 'transporting', 'destination', 'received', 'cost','drivenBy'];
  public dataSource : RouteDataSource = new RouteDataSource(this.transportationService, this.toastr);
  public pageRequest : TransportationPageRequest = new TransportationPageRequest();
  public dashboardData : TransportationDashboardResponse = new TransportationDashboardResponse();

  constructor(private transportationService : TransportationService,
    private toastr : ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource.loadTransportations();

    this.transportationService.getTransportationDashboardInfo().subscribe({
      next: (response) => {
        this.dashboardData = response;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  public loadTransportations() {
    this.dataSource.loadTransportations(this.pageRequest);
  }

  public onPageChange(pageEvent: any) {
    this.pageRequest.pageIndex = pageEvent.pageIndex;
    this.pageRequest.pageSize = pageEvent.pageSize;
    this.loadTransportations();
  }

  public showRouteDetails(transportationId : number) {
    this.router.navigate([`route-dashboard/route-info/${transportationId}`]);
  }

  public getMoneyString(money : Money | null) : string {
    if(!!money == false) {
      return '';
    }
    return `${money!.currency} ${money!.amount}`;
  }

  public getFullNameOfDriver(employeeInfo : EmployeeInfo) : string {
    if (employeeInfo == null) {
      return '';
    }
    return `${employeeInfo.firstName} ${employeeInfo.middleName ?? ""} ${employeeInfo.lastName}`;
  }

}
