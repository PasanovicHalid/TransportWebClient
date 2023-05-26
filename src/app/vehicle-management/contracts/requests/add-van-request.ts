export class AddVanRequest {
    id: number = 0;
    width: number = 0;
    depth: number = 0;
    manufacturer: string = '';
    model: string = '';
    dateOfManufacturing : Date = new Date();
    widthCompartment: number = 0;
    depthCompartment: number = 0;
    heightCompartment: number = 0;
    maxCarryWeight: number = 0;
}
