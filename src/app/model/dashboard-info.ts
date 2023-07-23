import { ChartDatapoint } from "./chart-datapoint";

export class DashboardInfo {
    vehiclesCount: number = 0;
    inflow : number = 0;
    outflow: number = 0;
    transportationsInProgress: number = 0;
    employeeExpenses: number = 0;
    transportationGainsPerDay : ChartDatapoint[] = [];
    transportationCostsPerDay : ChartDatapoint[] = [];
    transportationCountPerDay : ChartDatapoint[] = [];
}
