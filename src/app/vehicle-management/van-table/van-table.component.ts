import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VanPageRequest } from '../contracts/requests/van-page-request';
import { VanDataSource } from '../data-source/van-data-source';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-van-table',
  templateUrl: './van-table.component.html',
  styleUrls: ['./van-table.component.scss']
})
export class VanTableComponent implements OnInit {
  displayedColumns: string[] = ['manufacturer', 'model', 'dateOfManufacturing', 'dimensions', 'van-capacity', 'max-carry-weight'];
  public dataSource : VanDataSource = new VanDataSource(this.vehicleService, this.toastr);
  public pageRequest: VanPageRequest = new VanPageRequest();

  constructor(private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource.loadVans();
  }

  public loadVans() {
    this.dataSource.loadVans(this.pageRequest);
  }

  public onPageChange(pageEvent: any) {
    this.pageRequest.pageIndex = pageEvent.pageIndex;
    this.pageRequest.pageSize = pageEvent.pageSize;
    this.loadVans();
  }

  public showVanInfo(vanId: number) {
    this.router.navigate(['/vehicle-dashboard/van-info', vanId]);
  }
}
