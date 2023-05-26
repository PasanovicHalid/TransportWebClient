import { Component } from '@angular/core';
import { AddVanRequest } from '../contracts/requests/add-van-request';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';
import { Router } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-add-van',
  templateUrl: './add-van.component.html',
  styleUrls: ['./add-van.component.scss']
})
export class AddVanComponent {
  vanInfo: AddVanRequest = new AddVanRequest();

  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router) { }

  handleVehicleInfoEvent(vanInfo: AddVanRequest) {
    this.vanInfo = vanInfo;
    this.vehicleService.registerVan(this.vanInfo).subscribe({
      next: () => {
        this.toastr.success("Van added successfully!");
        this.router.navigate(['/vehicle-dashboard/vans']);
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
