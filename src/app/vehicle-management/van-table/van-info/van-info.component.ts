import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../services/vehicle.service';
import { AddVanRequest } from '../../contracts/requests/add-van-request';
import { VanInfo } from 'src/app/model/entities/van-info';
import { CompanyService } from 'src/app/services/company.service';
import { DriverService } from 'src/app/services/driver.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeInfo } from 'src/app/model/entities/employee-info';
import { AssignDriverToVehicleRequest } from '../../contracts/requests/assign-driver-to-vehicle-request';
import { TrailerPageRequest } from '../../contracts/requests/trailer-page-request';
import { TrailerForVehicleDataSource } from '../../data-source/trailer-for-vehicle-data-source';

@Component({
  selector: 'app-van-info',
  templateUrl: './van-info.component.html',
  styleUrls: ['./van-info.component.scss']
})
export class VanInfoComponent implements OnInit {
  vanInfo: VanInfo = new VanInfo();
  vanId: number = 0;

  assignDriverToVehicleRequest: AssignDriverToVehicleRequest = new AssignDriverToVehicleRequest();

  displayedColumns: string[] = ['id', 'maxCarryWeight', 'volume'];
  public dataSource : TrailerForVehicleDataSource = new TrailerForVehicleDataSource(this.companyService, this.toastr);
  public pageRequest: TrailerPageRequest = new TrailerPageRequest();

  driverOptions: EmployeeInfo[] = [];

  ErrorMap: Map<string, string> = new Map<string, string>();

  constructor(
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private companyService: CompanyService,
    private employeeService: EmployeeService,
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

        this.assignDriverToVehicleRequest.vehicleId = this.vanInfo.id;
        this.assignDriverToVehicleRequest.driverId = this.vanInfo.driverId;

        this.loadTrailers(this.vanId);

        if (this.vanInfo.driverId != null) {
          this.employeeService.getEmployeeById(this.vanInfo.driverId).subscribe({
            next: (response) => {
              let employeeInfo = new EmployeeInfo();

              employeeInfo.initializeEmployeeInfo(response.id,
                response.role,
                response.email,
                response.password,
                response.phoneNumber,
                response.firstName,
                response.middleName,
                response.lastName,
                response.salary,
                response.address,
                response.vehicleId);

              this.driverOptions.push(employeeInfo);
            },
            error: (error) => {
              this.toastr.error(error.error.title);
            }
          });
        }
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });

    this.companyService.getDriversWithoutVehicles().subscribe({
      next: (response) => {
        this.driverOptions.push(...response);
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

  assignVehicle() {
    this.driverService.assignVehicle(this.assignDriverToVehicleRequest.driverId, this.assignDriverToVehicleRequest.vehicleId).subscribe({
      next: () => {
        this.toastr.success('Driver assigned successfully');
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  unassignVehicle() {
    this.driverService.unassignVehicle(this.assignDriverToVehicleRequest.driverId).subscribe({
      next: () => {
        this.toastr.success('Driver unassigned successfully');
        this.assignDriverToVehicleRequest.driverId = 0;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  openTrailerInfo(trailerId: number) {
    this.router.navigate(['/vehicle-dashboard/trailer-info', trailerId]);
  }

  public loadTrailers(vehicleId : number) {
    this.dataSource.loadTrailers(this.pageRequest, vehicleId);
  }

  public onPageChange(pageEvent: any) {
    this.pageRequest.pageIndex = pageEvent.pageIndex;
    this.pageRequest.pageSize = pageEvent.pageSize;
    this.loadTrailers(this.vanId);
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
