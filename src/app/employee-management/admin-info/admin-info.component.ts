import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeInfo } from '../../model/entities/employee-info';
import { GpsCoordinate } from '../../model/value-objects/gps-coordinate';
import { FirstLetterLowercasePipe } from 'src/app/common-code/pipes/first-letter-lowercase-pipe';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.scss']
})
export class AdminInfoComponent implements OnInit {
  userId: number;

  employeeInfo: EmployeeInfo = new EmployeeInfo();

  ErrorMap : Map<string, string> = new Map<string, string>();

  title: string = 'Admin Info';

  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private toastr: ToastrService) {

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
            
          this.setGpsCoordinates();
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error(error.error.title);
        }
      });
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
