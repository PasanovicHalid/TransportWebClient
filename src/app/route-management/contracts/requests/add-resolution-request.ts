import { TransportationInfo } from "src/app/model/entities/transportation-info";
import { GpsCoordinate } from "src/app/model/value-objects/gps-coordinate";
import { Money } from "src/app/model/value-objects/money";

export class AddResolutionRequest {
    transportationId : number = 0;
    driverId : number = 0;
    cost : Money = new Money();
    startLocation : GpsCoordinate = new GpsCoordinate();

    public fromTransportationInfo(info : TransportationInfo) : AddResolutionRequest {
        this.transportationId = info.id;
        this.driverId = info.driverId;
        this.cost = info.cost ?? new Money();
        this.startLocation = info.startLocation ?? new GpsCoordinate();

        return this;
    }
}
