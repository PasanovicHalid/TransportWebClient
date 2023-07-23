import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeInfo } from '../../model/entities/employee-info';
import { GpsCoordinate } from '../../model/value-objects/gps-coordinate';
import { FirstLetterLowercasePipe } from 'src/app/common-code/pipes/first-letter-lowercase-pipe';
import { EmployeeService } from 'src/app/services/employee.service';
import { AssignVehicleRequest } from '../contracts/requests/assign-vehicle-request';
import { VehicleInfo } from 'src/app/model/entities/vehicle-info';
import { DriverService } from 'src/app/services/driver.service';
import { CompanyService } from 'src/app/services/company.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {
  userId: number;

  employeeInfo: EmployeeInfo = new EmployeeInfo();

  assignVehicleRequest : AssignVehicleRequest = new AssignVehicleRequest();

  vehicleOptions: VehicleInfo[] = [];

  ErrorMap: Map<string, string> = new Map<string, string>();

  title: string = 'Driver Info';

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private driverService: DriverService,
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private toastr: ToastrService,
    private router: Router) {

    const userIdFromRoute = this.route.snapshot.paramMap.get('id') ?? '';
    this.userId = parseInt(userIdFromRoute);
  }

  ngOnInit(): void {
    this.employeeService.getEmployeeById(this.userId).subscribe(
      {
        next: (response) => {
          this.employeeInfo = new EmployeeInfo();
          
          this.employeeInfo.initializeEmployeeInfo(response.id, 
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

          this.assignVehicleRequest.driverId = this.employeeInfo.id;
          this.assignVehicleRequest.vehicleId = this.employeeInfo.vehicleId;
          
          if (this.employeeInfo.vehicleId) {
            this.vehicleService.getVehicleById(this.employeeInfo.vehicleId).subscribe({
              next: (response) => {
                this.vehicleOptions.push(response);
              },
              error: (error) => {
                this.toastr.error(error.error.title);
              }
            });
          }
          
          this.setGpsCoordinates();
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error(error.error.title);
        }
      });

      this.companyService.getFreeVehiclesByCompany().subscribe({
        next: (response) => {
          this.vehicleOptions.push(...response);
        },
        error: (error) => {
          this.toastr.error(error.error.title);
        }
      });
  }

  handleFireDriver() {
    this.router.navigate(['/employee-dashboard']);
  }

  handleUpdateDriver(employeeInfo: EmployeeInfo) {
    this.employeeService.updateEmployee(employeeInfo).subscribe({
      next: () => {
        this.toastr.success('Driver updated successfully');
      },
      error: (error) => {
        this.AssingErrorsToMap(error);
        this.toastr.error(error.error.title);
      }
    });
  }

  assignVehicle() {
    this.driverService.assignVehicle(this.assignVehicleRequest.driverId, this.assignVehicleRequest.vehicleId).subscribe({
      next: () => {
        this.toastr.success('Vehicle assigned successfully');
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  unassignVehicle() {
    this.driverService.unassignVehicle(this.assignVehicleRequest.driverId).subscribe({
      next: () => {
        this.toastr.success('Vehicle unassigned successfully');
        this.assignVehicleRequest.vehicleId = 0;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  private setGpsCoordinates() {
    if (!this.employeeInfo.address.gpsCoordinate) {
      this.employeeInfo.address.gpsCoordinate = new GpsCoordinate();
    }
  }

  private AssingErrorsToMap(error: any) {
    const errorMap = new Map<string, string>();
    const pipe = new FirstLetterLowercasePipe();
    for (const [key, value] of Object.entries(error.error.errors)) {
      errorMap.set(pipe.transform(key), value as string);
    }
    this.ErrorMap = errorMap;
  }

}
