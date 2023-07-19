import { EmployeeInfo } from "src/app/model/entities/employee-info";
import { Address } from "src/app/model/value-objects/address";
import { Cargo } from "src/app/model/value-objects/cargo";
import { Money } from "src/app/model/value-objects/money";
import { CompanyInfo } from "./company-info";
import { GpsCoordinate } from "../value-objects/gps-coordinate";

export class TransportationInfo {
    id : number = 0;
    start : Date = new Date();
    requiredFor : Date = new Date();
    transporting : Cargo = new Cargo();
    destination : Address = new Address();
    cost : Money | null = new Money();
    received : Money = new Money();
    startLocation : GpsCoordinate | null = new GpsCoordinate();
    drivenBy : EmployeeInfo | null = new EmployeeInfo();
    designatedTo : CompanyInfo | null = new CompanyInfo();
    driverId : number = 0;
    companyId : number = 0;
}
