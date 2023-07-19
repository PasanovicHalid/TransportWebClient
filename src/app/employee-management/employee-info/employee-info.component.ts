import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EmployeeInfo } from '../../model/entities/employee-info';
import { GpsCoordinate } from '../../model/value-objects/gps-coordinate';
import { ToastrService } from 'ngx-toastr';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.scss']
})
export class EmployeeInfoComponent implements OnInit {
  hide: boolean = true;
  isDriver: boolean = false;

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  firstName: FormControl = new FormControl('', [Validators.required]);
  lastName: FormControl = new FormControl('', [Validators.required]);
  phoneNumber: FormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  street: FormControl = new FormControl('', [Validators.required]);
  city: FormControl = new FormControl('', [Validators.required]);
  state: FormControl = new FormControl('', [Validators.required]);
  postalCode: FormControl = new FormControl('', [Validators.required]);
  country: FormControl = new FormControl('', [Validators.required]);
  salary: FormControl = new FormControl('', [Validators.required]);

  @Input() title: string = '';
  @Input() employeeInfo: EmployeeInfo = new EmployeeInfo();
  @Input() ErrorMap: Map<string, string> = new Map<string, string>();
  @Output() updateEmployeeInfoEvent = new EventEmitter<EmployeeInfo>();
  @Output() fireEmployeeEvent = new EventEmitter<void>();

  constructor(
    private driverService: DriverService,
    private toastr: ToastrService
  ) { 
    
  }

  ngOnInit(): void {
    this.isDriver = this.employeeInfo.role == 'Driver';
  }


  emitUpdateEmployeeInfo(): void {
    this.updateEmployeeInfoEvent.emit(this.employeeInfo);
  }

  emitFire(): void {
    this.driverService.fireDriver(this.employeeInfo.id).subscribe({
      next: () => {
        this.fireEmployeeEvent.emit();
        this.toastr.success('Driver fired');
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }
}
