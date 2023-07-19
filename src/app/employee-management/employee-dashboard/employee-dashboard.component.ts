import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDataSource } from '../data-source/employee-data-source';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmployeePageRequest } from '../model/employee-page-request';
import { EmployeeInfo } from '../../model/entities/employee-info';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeDashboardResponse } from '../contracts/response/employee-dashboard-response';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'email', 'role', 'salary'];
  public dataSource: EmployeeDataSource = new EmployeeDataSource(this.employeeService, this.toastr);
  public pageRequest: EmployeePageRequest = new EmployeePageRequest();
  public employeeDashboardData: EmployeeDashboardResponse = new EmployeeDashboardResponse();


  constructor(private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataSource.loadEmployees();

    this.employeeService.getEmployeeDashboardInfo().subscribe({
      next: (response) => {
        this.employeeDashboardData = response;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  public loadEmployees() {
    this.dataSource.loadEmployees(this.pageRequest);
  }

  public onPageChange(pageEvent: any) {
    this.pageRequest.pageIndex = pageEvent.pageIndex;
    this.pageRequest.pageSize = pageEvent.pageSize;
    this.loadEmployees();
  }

  public display(employee: EmployeeInfo) {
    switch (employee.role) {
      case 'Admin':
        this.router.navigate(['/employee-dashboard/admin-info', employee.id]);
        break;
      case 'Driver':
        this.router.navigate(['/employee-dashboard/driver-info', employee.id]);
        break;
    }
  }
}
