import { Address } from "src/app/model/value-objects/address";

export interface GetEmployeeResponse {
    id : number;
    role : string;
    email : string;
    password : string;
    phoneNumber : string;
    firstName : string;
    middleName : string | null;
    lastName : string;
    salary : number;
    address : Address;
    vehicleId: number;
}
