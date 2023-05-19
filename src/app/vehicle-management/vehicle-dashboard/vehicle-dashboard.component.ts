import { Component } from '@angular/core';
import { fadeAnimation } from 'src/app/animations/fade';


@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.scss'],
  animations: [
    fadeAnimation
  ],
})
export class VehicleDashboardComponent {

}
