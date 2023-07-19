import { Address } from "src/app/model/value-objects/address";
import { Cargo } from "src/app/model/value-objects/cargo";
import { Money } from "src/app/model/value-objects/money";

export class AddRouteRequest {
    dateOfDeparture: Date = new Date();
    dateOfArrival: Date = new Date();
    cargo : Cargo = new Cargo();
    received : Money = new Money();
    destination : Address = new Address();
}
