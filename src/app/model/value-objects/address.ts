import { GpsCoordinate } from "./gps-coordinate";

export class Address {
    street : string = '';
    city : string = '';
    state : string = '';
    postalCode : string = '';
    country : string = '';
    gpsCoordinate : GpsCoordinate = new GpsCoordinate();

    public getFullAddress() : string {
        return `${this.street}, ${this.city}, ${this.state}, ${this.postalCode}, ${this.country}`;
    }
}
