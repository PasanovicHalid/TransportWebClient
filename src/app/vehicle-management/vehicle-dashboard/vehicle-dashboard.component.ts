import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from 'src/app/animations/fade';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: './vehicle-dashboard.component.html',
  styleUrls: ['./vehicle-dashboard.component.scss'],
  animations: [
    fadeAnimation
  ],
})
export class VehicleDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
}
