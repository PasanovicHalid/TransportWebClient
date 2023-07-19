import { Capacity } from "../value-objects/capacity";
import { Dimensions } from "../value-objects/dimensions";

export class VanInfo {
    id: number = 0;
    manufacturer: string = '';
    model: string = '';
    dateOfManufacturing : Date = new Date();
    dimensions: Dimensions = new Dimensions();
    capacity: Capacity = new Capacity();
}
