import { Component } from '@angular/core';
import { AddTrailerRequest } from '../contracts/requests/add-trailer-request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-trailer',
  templateUrl: './add-trailer.component.html',
  styleUrls: ['./add-trailer.component.scss']
})
export class AddTrailerComponent {
  trailerInfo: AddTrailerRequest = new AddTrailerRequest();
  
  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private companyService: CompanyService,
    private toastr: ToastrService,
    private router: Router) { }

  addNewTrailer() {
    this.companyService.registerTrailer(this.trailerInfo).subscribe({
      next: () => {
        this.toastr.success("Trailer added successfully!");
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

  private AssingErrorsToMap(error: any) {
    const errorMap = new Map<string, string>();
    for (const [key, value] of Object.entries(error.error.errors)) {
      errorMap.set(key.toLowerCase(), value as string);
    }
    this.ErrorMap = errorMap;
  }

}
