import { Component, OnInit } from '@angular/core';
import { TrailerInfo } from '../../../model/entities/trailer-info';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdateTrailerRequest } from '../../contracts/requests/update-trailer-request';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-trailer-info',
  templateUrl: './trailer-info.component.html',
  styleUrls: ['./trailer-info.component.scss']
})
export class TrailerInfoComponent implements OnInit {
  trailerInfo: TrailerInfo = new TrailerInfo();

  trailerId: number = 0;
  
  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
      const trailerIdFromRoute = this.route.snapshot.paramMap.get('id') ?? '';
      this.trailerId = parseInt(trailerIdFromRoute);
     }

  ngOnInit(): void {
    this.companyService.getTrailerInfo(this.trailerId).subscribe({
      next: (trailerInfo) => {
        this.trailerInfo = trailerInfo;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  updateTrailer() {
    const request = this.prepareUpdateTrailerRequest();

    this.companyService.updateTrailer(request).subscribe({
      next: () => {
        this.toastr.success("Trailer updated successfully!");
        this.router.navigate(['/vehicle-dashboard/trailers']);
      },
      error: (error) => {
        if(error.status == 400){
          this.AssingErrorsToMap(error);
        }
        this.toastr.error(error.error.title);
      }
    });

  }

  deleteTrailer() {
    this.companyService.deleteTrailer(this.trailerInfo.id).subscribe({
      next: () => {
        this.toastr.success("Trailer deleted successfully!");
        this.router.navigate(['/vehicle-dashboard/trailers']);
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  private prepareUpdateTrailerRequest() {
    const request = new UpdateTrailerRequest();
    request.id = this.trailerInfo.id;
    request.width = this.trailerInfo.capacity.volume.width;
    request.height = this.trailerInfo.capacity.volume.height;
    request.depth = this.trailerInfo.capacity.volume.depth;
    request.maxCarryWeight = this.trailerInfo.capacity.maxCarryWeight;
    return request;
  }

  private AssingErrorsToMap(error: any) {
    const errorMap = new Map<string, string>();
    for (const [key, value] of Object.entries(error.error.errors)) {
      errorMap.set(key.toLowerCase(), value as string);
    }
    this.ErrorMap = errorMap;
  }
}
