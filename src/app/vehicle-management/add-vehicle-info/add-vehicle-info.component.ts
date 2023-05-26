import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VehicleInfo } from '../model/vehicle-info';
import { AddVanRequest } from '../contracts/requests/add-van-request';

@Component({
  selector: 'app-add-vehicle-info',
  templateUrl: './add-vehicle-info.component.html',
  styleUrls: ['./add-vehicle-info.component.scss']
})
export class AddVehicleInfoComponent {

  @Input() vehicleInfo: VehicleInfo = new VehicleInfo();
  @Input() vanInfo: AddVanRequest = new AddVanRequest();
  @Input() isVan: boolean = false;
  @Input() ErrorMap : Map<string, string> = new Map<string, string>();
  @Output() vehicleInfoEvent = new EventEmitter<VehicleInfo>();
  @Output() vanInfoEvent = new EventEmitter<AddVanRequest>();

  emitVehicleInfo() : void {
    this.vehicleInfoEvent.emit(this.vehicleInfo);
  }

  emitVanInfo() : void {
    this.vanInfo.model = this.vehicleInfo.model;
    this.vanInfo.manufacturer = this.vehicleInfo.manufacturer;
    this.vanInfo.dateOfManufacturing = this.vehicleInfo.dateOfManufacturing;
    this.vanInfo.width = this.vehicleInfo.width;
    this.vanInfo.depth = this.vehicleInfo.depth;
    this.vanInfoEvent.emit(this.vanInfo);
  }

}
