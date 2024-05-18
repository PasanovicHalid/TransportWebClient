import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from '../../../services/vehicle.service';
import { TruckInfo } from 'src/app/model/entities/truck-info';
import { AssignVehicleRequest } from '../../contracts/requests/assign-vehicle-request';
import { AssignDriverToVehicleRequest } from '../../contracts/requests/assign-driver-to-vehicle-request';
import { DriverService } from 'src/app/services/driver.service';
import { EmployeeInfo } from 'src/app/model/entities/employee-info';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { TrailerForVehicleDataSource } from '../../data-source/trailer-for-vehicle-data-source';
import { TrailerPageRequest } from '../../contracts/requests/trailer-page-request';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.scss']
})
export class TruckInfoComponent {
  truckInfo: TruckInfo = new TruckInfo();
  truckId: number = 0;

  assignDriverToVehicleRequest: AssignDriverToVehicleRequest = new AssignDriverToVehicleRequest();

  driverOptions: EmployeeInfo[] = [];

  displayedColumns: string[] = ['id', 'maxCarryWeight', 'volume'];
  public dataSource : TrailerForVehicleDataSource = new TrailerForVehicleDataSource(this.companyService, this.toastr);
  public pageRequest: TrailerPageRequest = new TrailerPageRequest();

  ErrorMap: Map<string, string> = new Map<string, string>();

  constructor(
    private vehicleService: VehicleService,
    private driverService: DriverService,
    private companyService: CompanyService,
    private employeeService: EmployeeService,
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
        this.assignDriverToVehicleRequest.vehicleId = this.truckInfo.id;
        this.assignDriverToVehicleRequest.driverId = this.truckInfo.driverId;

        this.loadTrailers(this.truckId);

        if (this.truckInfo.driverId != null) {
          this.employeeService.getEmployeeById(this.truckInfo.driverId).subscribe({
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
    this.loadTrailers(this.truckId);
  }

  private AssingErrorsToMap(error: any) {
    const errorMap = new Map<string, string>();
    for (const [key, value] of Object.entries(error.error.errors)) {
      errorMap.set(key.toLowerCase(), value as string);
    }
    this.ErrorMap = errorMap;
  }

}
