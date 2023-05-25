import { GpsCoordinate } from "./gps-coordinate";

export class Address {
    street : string = '';
    city : string = '';
    state : string = '';
    postalCode : string = '';
    country : string = '';
    gpsCoordinate : GpsCoordinate = new GpsCoordinate();
}
