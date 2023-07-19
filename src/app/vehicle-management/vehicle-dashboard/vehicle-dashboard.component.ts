import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/animations/fade';
import { VehicleDashboardResponse } from '../contracts/response/vehicle-dashboard-response';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.scss'],
  animations: [
    fadeAnimation
  ],
})
export class VehicleDashboardComponent implements OnInit {
  dashboardData: VehicleDashboardResponse = new VehicleDashboardResponse();

  constructor(private vehicleService: VehicleService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.vehicleService.getVehicleDashboardInfo().subscribe({
      next: (dashboardData) => {
        this.dashboardData = dashboardData;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }
}
