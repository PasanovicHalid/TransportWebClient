import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../services/vehicle.service';
import { TruckInfo } from 'src/app/model/entities/truck-info';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.scss']
})
export class TruckInfoComponent {
  truckInfo: TruckInfo = new TruckInfo();
  truckId: number = 0;

  ErrorMap: Map<string, string> = new Map<string, string>();

  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    const truckIdFromRoute = this.route.snapshot.paramMap.get('id') ?? '';
    this.truckId = parseInt(truckIdFromRoute);
  }

  ngOnInit(): void {
    this.vehicleService.getTruckById(this.truckId).subscribe({
      next: (truckInfo) => {
        this.truckInfo = truckInfo;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  updateTruck() {
    this.vehicleService.updateTruck(this.truckInfo).subscribe({
      next: () => {
        this.toastr.success("Truck updated successfully!");
        this.router.navigate(['/vehicle-dashboard/trucks']);
      },
      error: (error) => {
        if (error.status == 400) {
          this.AssingErrorsToMap(error);
        }
        this.toastr.error(error.error.title);
      }
    });
  }

  deleteTruck() {
    this.vehicleService.deleteTruck(this.truckInfo.id).subscribe({
      next: () => {
        this.toastr.success("Truck deleted successfully!");
        this.router.navigate(['/vehicle-dashboard/trucks']);
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
