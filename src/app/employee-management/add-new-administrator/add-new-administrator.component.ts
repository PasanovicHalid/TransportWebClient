import { Component } from '@angular/core';
import { EmployeeInfo } from '../../model/entities/employee-info';
import { CompanyService } from '../../services/company.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterAdministratorRequest } from '../contracts/requests/register-administrator-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-administrator',
  templateUrl: './add-new-administrator.component.html',
  styleUrls: ['./add-new-administrator.component.scss']
})
export class AddNewAdministratorComponent {

  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private companyService : CompanyService,
    private toastr : ToastrService,
    private router: Router) { }

  registerAdmin(employeeInfo: EmployeeInfo){
    let request : RegisterAdministratorRequest = new RegisterAdministratorRequest();
    request.employeeInfo = employeeInfo;
    this.companyService.registerAdministator(request).subscribe({
      next: (response) => {
        this.toastr.success("Administrator successfully registered");
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
