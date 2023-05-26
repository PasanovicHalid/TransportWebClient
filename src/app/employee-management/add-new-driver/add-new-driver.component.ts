import { Component } from '@angular/core';
import { EmployeeInfo } from '../model/employee-info';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../services/company.service';
import { RegisterDriverRequest } from '../contracts/requests/register-driver-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-driver',
  templateUrl: './add-new-driver.component.html',
  styleUrls: ['./add-new-driver.component.scss']
})
export class AddNewDriverComponent {
  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private companyService : CompanyService,
    private toastr : ToastrService,
    private router: Router) { }

  registerDriver(employeeInfo: EmployeeInfo){
    let request : RegisterDriverRequest = new RegisterDriverRequest();
    request.employeeInfo = employeeInfo;
    this.companyService.registerDriver(request).subscribe({
      next: (response) => {
        this.toastr.success("Driver successfully registered");
        this.router.navigate(['/employee-dashboard']);
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
