import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { TrailerInfo } from "../../model/entities/trailer-info";
import { TrailerPageRequest } from "../contracts/requests/trailer-page-request";
import { CompanyService } from "src/app/services/company.service";

export class TrailerDataSource extends DataSource<TrailerInfo> {
    private trailerSubject = new BehaviorSubject<TrailerInfo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.totalSubject.asObservable();

    constructor(private companyService: CompanyService,
        private toastr: ToastrService) {
        super();
    }

    override connect(): Observable<TrailerInfo[]> {
        return this.trailerSubject.asObservable();
    }

    override disconnect(collectionViewer: CollectionViewer): void {
        this.trailerSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    loadTrailers(request: TrailerPageRequest = new TrailerPageRequest()) {
        this.loadingSubject.next(true);
        this.companyService.getTrailers(request).subscribe({
            next: (response) => {
                this.trailerSubject.next(response.items);
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
