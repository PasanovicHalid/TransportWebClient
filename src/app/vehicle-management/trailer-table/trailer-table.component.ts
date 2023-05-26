import { Component, OnInit } from '@angular/core';
import { TruckDataSource } from '../data-source/truck-data-source';
import { TruckPageRequest } from '../contracts/requests/truck-page-request';
import { VehicleService } from '../services/vehicle.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TrailerDataSource } from '../data-source/trailer-data-source';
import { TrailerPageRequest } from '../contracts/requests/trailer-page-request';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-trailer-table',
  templateUrl: './trailer-table.component.html',
  styleUrls: ['./trailer-table.component.scss']
})
export class TrailerTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'maxCarryWeight', 'volume', 'belongsToTruck'];
  public dataSource : TrailerDataSource = new TrailerDataSource(this.companyService, this.toastr);
  public pageRequest: TrailerPageRequest = new TrailerPageRequest();

  constructor(private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource.loadTrailers();
  }

  public loadTrailers() {
    this.dataSource.loadTrailers(this.pageRequest);
  }

  public onPageChange(pageEvent: any) {
    this.pageRequest.pageIndex = pageEvent.pageIndex;
    this.pageRequest.pageSize = pageEvent.pageSize;
    this.loadTrailers();
  }

  openTrailerInfo(trailerId: number) {
    this.router.navigate(['/vehicle-dashboard/trailer-info', trailerId]);
  }
}
