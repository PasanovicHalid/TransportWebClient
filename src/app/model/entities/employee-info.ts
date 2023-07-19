import { Address } from "../value-objects/address";

export class EmployeeInfo {
    id: number = 0;
    role: string = '';
    email: string = '';
    password: string = '';
    phoneNumber: string = '';
    firstName: string = '';
    middleName: string | null = null;
    lastName: string = '';
    salary: number = 0;
    address: Address = new Address();

    initializeEmployeeInfo(id: number,
        role: string,
        email: string,
        password: string,
        phoneNumber: string,
        firstName: string,
        middleName: string | null,
        lastName: string,
        salary: number,
        address: Address) {
        this.id = id;
        this.role = role;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.salary = salary;
        this.address = address;
    }

    getFullName(): string {
        return `${this.firstName} ${this.middleName} ${this.lastName}`;
    }
}
