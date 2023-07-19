import { Address } from "../value-objects/address";
import { EmployeeInfo } from "./employee-info";
import { TrailerInfo } from "./trailer-info";
import { VehicleInfo } from "./vehicle-info";

export class CompanyInfo {
    id: number = 0;
    name: string = '';
    address: Address = new Address();
    vehicles: VehicleInfo[] = [];
    employees: EmployeeInfo[] = [];
    trailers: TrailerInfo[] = [];
}
