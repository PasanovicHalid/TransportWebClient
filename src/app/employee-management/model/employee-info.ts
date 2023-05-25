import { Address } from "./address";

export class EmployeeInfo {
    id : number = 0;
    role : string = '';
    email : string = '';
    password : string = '';
    phoneNumber : string = '';
    firstName : string = '';
    middleName : string | null = null;
    lastName : string = '';
    salary : number = 0;
    address : Address = new Address();
}
