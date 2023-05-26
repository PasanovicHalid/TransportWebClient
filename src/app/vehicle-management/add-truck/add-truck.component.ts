import { Component } from '@angular/core';
import { VehicleInfo } from '../model/vehicle-info';
import { CompanyService } from '../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.scss']
})
export class AddTruckComponent {
  vehicleInfo: VehicleInfo = new VehicleInfo();

  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router) { }

  handleVehicleInfoEvent(vehicleInfo: VehicleInfo) {
    this.vehicleInfo = vehicleInfo;
    this.companyService.registerTruck(this.vehicleInfo).subscribe({
      next: () => {
        this.toastr.success("Truck added successfully!");
        this.router.navigate(['/vehicle-dashboard/trucks']);
      },
      error: (error) => {
        if(error.status == 400){
          this.AssingErrorsToMap(error);
        }
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
