import { Dimensions } from "./dimensions";

export class TruckInfo {
    id: number = 0;
    manufacturer: string = '';
    model: string = '';
    dateOfManufacturing : Date = new Date();
    dimensions: Dimensions = new Dimensions();
}
