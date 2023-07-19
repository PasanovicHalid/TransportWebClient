import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeInfo } from '../../model/entities/employee-info';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee-info',
  templateUrl: './add-employee-info.component.html',
  styleUrls: ['./add-employee-info.component.scss']
})
export class AddEmployeeInfoComponent {
  hide : boolean = true;
  employeeInfo: EmployeeInfo = new EmployeeInfo();

  email : FormControl = new FormControl('', [Validators.required, Validators.email]);
  password : FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  firstName : FormControl = new FormControl('', [Validators.required]);
  lastName : FormControl = new FormControl('', [Validators.required]);
  phoneNumber : FormControl = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
  street : FormControl = new FormControl('', [Validators.required]);
  city : FormControl = new FormControl('', [Validators.required]);
  state : FormControl = new FormControl('', [Validators.required]);
  postalCode : FormControl = new FormControl('', [Validators.required]);
  country : FormControl = new FormControl('', [Validators.required]);
  salary: FormControl = new FormControl('', [Validators.required]);

  @Input() Title: string = '';
  @Input() ButtonTitle: string = '';
  @Input() ErrorMap : Map<string, string> = new Map<string, string>();
  @Output() employeeInfoEvent = new EventEmitter<EmployeeInfo>();

  emitEmployeeInfo() : void {
    this.employeeInfoEvent.emit(this.employeeInfo);
  }
   
}
