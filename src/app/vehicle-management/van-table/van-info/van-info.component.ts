import { Component, OnInit } from '@angular/core';
import { VanInfo } from '../../model/van-info';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../services/vehicle.service';
import { AddVanRequest } from '../../contracts/requests/add-van-request';

@Component({
  selector: 'app-van-info',
  templateUrl: './van-info.component.html',
  styleUrls: ['./van-info.component.scss']
})
export class VanInfoComponent implements OnInit {
  vanInfo: VanInfo = new VanInfo();
  vanId: number = 0;

  ErrorMap: Map<string, string> = new Map<string, string>();

  constructor(
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
    const vanIdFromRoute = this.route.snapshot.paramMap.get('id') ?? '';
    this.vanId = parseInt(vanIdFromRoute);
  }

  ngOnInit(): void {
    this.vehicleService.getVanById(this.vanId).subscribe({
      next: (vanInfo) => {
        this.vanInfo = vanInfo;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  updateVan() {
    const request: AddVanRequest = this.prepareUpdateVanRequest();

    this.vehicleService.updateVan(request).subscribe({
      next: () => {
        this.toastr.success("Van updated successfully!");
        this.router.navigate(['/vehicle-dashboard/vans']);
      },
      error: (error) => {
        if (error.status == 400) {
          this.AssingErrorsToMap(error);
        }
        this.toastr.error(error.error.title);
      }
    });
  }

  deleteVan() {
    this.vehicleService.deleteVan(this.vanInfo.id).subscribe({
      next: () => {
        this.toastr.success("Van deleted successfully!");
        this.router.navigate(['/vehicle-dashboard/vans']);
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

  private prepareUpdateVanRequest() {
    const request: AddVanRequest = new AddVanRequest();
    request.id = this.vanInfo.id;
    request.width = this.vanInfo.dimensions.width;
    request.depth = this.vanInfo.dimensions.depth;
    request.manufacturer = this.vanInfo.manufacturer;
    request.model = this.vanInfo.model;
    request.dateOfManufacturing = this.vanInfo.dateOfManufacturing;
    request.widthCompartment = this.vanInfo.capacity.volume.width;
    request.depthCompartment = this.vanInfo.capacity.volume.depth;
    request.heightCompartment = this.vanInfo.capacity.volume.height;
    request.maxCarryWeight = this.vanInfo.capacity.maxCarryWeight;
    return request;
  }

}
