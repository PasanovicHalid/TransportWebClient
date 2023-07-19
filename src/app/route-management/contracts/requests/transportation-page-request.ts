export class TransportationPageRequest {
    pageIndex: number = 0;
    pageSize: number = 10;
    includeProperties: string[] = ['DrivenBy', 'DesignatedTo'];
}
