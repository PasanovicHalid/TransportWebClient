import { Dimensions } from "../value-objects/dimensions";

export class TruckInfo {
    id: number = 0;
    manufacturer: string = '';
    model: string = '';
    dateOfManufacturing : Date = new Date();
    dimensions: Dimensions = new Dimensions();
    driverId: number = 0;
}
