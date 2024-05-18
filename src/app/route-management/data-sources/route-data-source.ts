import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { TransportationInfo } from "src/app/model/entities/transportation-info";
import { TransportationPageRequest } from "../contracts/requests/transportation-page-request";
import { TransportationService } from "src/app/services/transportation.service";

export class RouteDataSource extends DataSource<TransportationInfo> {
    private transportationSubject = new BehaviorSubject<TransportationInfo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.totalSubject.asObservable();

    constructor(private transportationService: TransportationService,
        private toastr: ToastrService) {
        super();
    }

    override connect(collectionViewer: CollectionViewer): Observable<readonly TransportationInfo[]> {
        return this.transportationSubject.asObservable();
    }

    override disconnect(collectionViewer: CollectionViewer): void {
        this.transportationSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    loadTransportations(request : TransportationPageRequest = new TransportationPageRequest()) {
        this.loadingSubject.next(true);
        this.transportationService.getTransportations(request).subscribe({
            next: (response) => {
                this.transportationSubject.next(response.items);
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
