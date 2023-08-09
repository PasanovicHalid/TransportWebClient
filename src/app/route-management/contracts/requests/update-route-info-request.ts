import { TransportationInfo } from "src/app/model/entities/transportation-info";
import { Address } from "src/app/model/value-objects/address";
import { Cargo } from "src/app/model/value-objects/cargo";
import { Money } from "src/app/model/value-objects/money";

export class UpdateRouteInfoRequest {
    id: number = 0;
    dateOfDeparture: Date = new Date();
    dateOfArrival: Date = new Date();
    cargo : Cargo = new Cargo();
    received : Money = new Money();
    destination : Address = new Address();
    origin : Address = new Address();

    fromTransportationInfo(transportationInfo: TransportationInfo) : UpdateRouteInfoRequest {
        this.id = transportationInfo.id;
        this.dateOfDeparture = transportationInfo.start;
        this.dateOfArrival = transportationInfo.requiredFor;
        this.cargo = transportationInfo.transporting;
        this.received = transportationInfo.received;
        this.destination = transportationInfo.destination;
        this.origin = transportationInfo.origin;

        return this;
    }
}
