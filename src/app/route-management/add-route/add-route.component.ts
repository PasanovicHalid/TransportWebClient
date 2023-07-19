import { Component } from '@angular/core';
import { AddRouteRequest } from '../contracts/requests/add-route-request';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TransportationService } from 'src/app/services/transportation.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent {
  data: AddRouteRequest = new AddRouteRequest();
  ErrorMap : Map<string, string> = new Map<string, string>();

  constructor(private transportationService: TransportationService,
    private toastr: ToastrService,
    private router: Router) { }

  public addRoute() {
    this.transportationService.addTransportation(this.data).subscribe({
      next: () => {
        this.toastr.success("Route added successfully!");
        this.router.navigate(['/route-dashboard']);
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
