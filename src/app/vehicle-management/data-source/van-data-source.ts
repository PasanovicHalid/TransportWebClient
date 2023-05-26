import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { VanPageRequest } from "../contracts/requests/van-page-request";
import { VanInfo } from "../model/van-info";
import { VehicleService } from "../services/vehicle.service";
import { VehicleInfo } from "../model/vehicle-info";

export class VanDataSource extends DataSource<VehicleInfo> {
    private vanSubject = new BehaviorSubject<VehicleInfo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.totalSubject.asObservable();

    constructor(private vehicleService: VehicleService,
        private toastr: ToastrService) {
        super();
    }

    override connect(): Observable<VehicleInfo[]> {
        return this.vanSubject.asObservable();
    }

    override disconnect(collectionViewer: CollectionViewer): void {
        this.vanSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    loadVans(request: VanPageRequest = new VanPageRequest()) {
        this.loadingSubject.next(true);
        this.vehicleService.getVans(request).subscribe({
            next: (response) => {
                this.vanSubject.next(response.items);
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
