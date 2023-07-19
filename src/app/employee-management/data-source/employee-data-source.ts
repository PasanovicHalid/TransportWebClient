import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { EmployeeInfo } from "../../model/entities/employee-info";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { EmployeePageRequest } from "../model/employee-page-request";
import { EmployeeService } from "src/app/services/employee.service";

export class EmployeeDataSource extends DataSource<EmployeeInfo> {
    private employeeSubject = new BehaviorSubject<EmployeeInfo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.totalSubject.asObservable();

    constructor(private employeeService: EmployeeService,
        private toastr: ToastrService) {
        super();
    }

    override connect(): Observable<EmployeeInfo[]> {
        return this.employeeSubject.asObservable();
    }

    override disconnect(collectionViewer: CollectionViewer): void {
        this.employeeSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    loadEmployees(request: EmployeePageRequest = new EmployeePageRequest()) {
        this.loadingSubject.next(true);
        this.employeeService.getEmployees(request).subscribe({
            next: (response) => {
                this.employeeSubject.next(response.items);
                this.totalSubject.next(response.totalCount);
                this.loadingSubject.next(false);
            },
            error: (error) => {
                this.toastr.error(error.error.title);
                this.loadingSubject.next(false);
            }
        });
    }

}
