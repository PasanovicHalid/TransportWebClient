import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { TruckPageRequest } from "../contracts/requests/truck-page-request";
import { TruckInfo } from "../model/truck-info";
import { VehicleService } from "../services/vehicle.service";
import { VehicleInfo } from "../model/vehicle-info";

export class TruckDataSource extends DataSource<VehicleInfo> {
    private truckSubject = new BehaviorSubject<VehicleInfo[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public total$ = this.totalSubject.asObservable();

    constructor(private vehicleService: VehicleService,
        private toastr: ToastrService) {
        super();
    }

    override connect(): Observable<VehicleInfo[]> {
        return this.truckSubject.asObservable();
    }

    override disconnect(collectionViewer: CollectionViewer): void {
        this.truckSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    loadTrucks(request: TruckPageRequest = new TruckPageRequest()) {
        this.loadingSubject.next(true);
        this.vehicleService.getTrucks(request).subscribe({
            next: (response) => {
                this.truckSubject.next(response.items);
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
