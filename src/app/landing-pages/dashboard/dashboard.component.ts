import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardInfo } from 'src/app/model/dashboard-info';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  routeCashflowOptions : ChartOptions = new ChartOptions("Route Gains/Costs", []);

  routeCountOptions : ChartOptions = new ChartOptions("Route Count", []);

  dashboardInfo: DashboardInfo = new DashboardInfo();

  constructor(private companyService: CompanyService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.companyService.getDashboardInfo().subscribe({
      next: (response) => {
        this.dashboardInfo = response;
        let transportationGainChartData = new LineOption("#9DC08B", "#5A5757", this.dashboardInfo.transportationGainsPerDay);
        let transportationCostChartData = new LineOption("#C24642", "#5A5757", this.dashboardInfo.transportationCostsPerDay);
        let transportationCountChartData = new LineOption("#4F81BC", "#5A5757", this.dashboardInfo.transportationCountPerDay);
        this.routeCashflowOptions = new ChartOptions("Route Gains/Costs", [transportationGainChartData, transportationCostChartData]);
        this.routeCountOptions = new ChartOptions("Route Count", [transportationCountChartData]);
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }
}

export class LineOption {
  type: string = "line";
  color: string = "#9DC08B";
  indexLabelFontColor: string = "#5A5757";
  dataPoints: any[] = [];

  constructor(color: string, indexLabelFontColor: string, dataPoints: any[]) {
    this.color = color;
    this.indexLabelFontColor = indexLabelFontColor;
    this.dataPoints = dataPoints;
  }
}

export class ChartOptions {
  title: {
    text: string
  };
  animationEnabled: boolean = true;
  axisY: 
  {
    includeZero: boolean
  } = {
        includeZero: true
      };
  backgroundColor: string = "#F3DEBA";
  data: any[] = [];

  constructor(title: string, data: any[]) {
    this.title = {
      text: title
    };
    this.data = data;

  }
}
