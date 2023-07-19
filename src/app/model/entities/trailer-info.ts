import { Capacity } from "../value-objects/capacity";

export class TrailerInfo {
    id: number = 0;
    capacity: Capacity = new Capacity();
    companyId: number = 0;
    vehicleId: number = 0;
}
