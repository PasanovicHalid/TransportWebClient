import { Component, OnInit } from '@angular/core';
import { TruckDataSource } from '../data-source/truck-data-source';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TruckPageRequest } from '../contracts/requests/truck-page-request';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-truck-table',
  templateUrl: './truck-table.component.html',
  styleUrls: ['./truck-table.component.scss']
})
export class TruckTableComponent implements OnInit {
  displayedColumns: string[] = ['manufacturer', 'model', 'dateOfManufacturing', 'dimensions'];
  public dataSource : TruckDataSource = new TruckDataSource(this.vehicleService, this.toastr);
  public pageRequest: TruckPageRequest = new TruckPageRequest();

  constructor(private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource.loadTrucks();
  }

  public loadTrucks() {
    this.dataSource.loadTrucks(this.pageRequest);
  }

  public onPageChange(pageEvent: any) {
    this.pageRequest.pageIndex = pageEvent.pageIndex;
    this.pageRequest.pageSize = pageEvent.pageSize;
    this.loadTrucks();
  }

  public showTruckInfo(truckId: number) {
    this.router.navigate(['/vehicle-dashboard/truck-info', truckId]);
  }
}
