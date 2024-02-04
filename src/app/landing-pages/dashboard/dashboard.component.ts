import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LawSearchEngineService } from 'src/app/services/law-search-engine.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public searchOptions: string[] = [];
  public searchOpetator = SearchOperator;

  public field: string = "";
  public value: string = "";
  public operator: SearchOperator = SearchOperator.AND;
  public address: string | undefined;
  public radius: number | undefined;

  public searchResults: any[] = [];


  constructor(private toastr: ToastrService, private lawSearchEngineService: LawSearchEngineService) {
  }


  ngOnInit(): void {

  }

  public addToken() {
    if (this.searchOptions.length == 0) {
      this.searchOptions.push(`${this.field}:'${this.value}'`);
    } else {
      this.searchOptions.push(`${this.operator}`);
      this.searchOptions.push(`${this.field}:'${this.value}'`);
    }
  }

  public downloadDocument(contract: any) {
    this.lawSearchEngineService.downloadDocument(contract).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

  public search() {

    this.lawSearchEngineService.searchContract({search: this.searchOptions, address: this.address, radius: this.radius }).subscribe({
      next: (response) => {
        this.searchResults = response;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

}

export class SearchOption {
  field: string = "";
  value: string = "";
}

export enum SearchOperator {
  AND = "AND",
  OR = "OR",
  NOT = "NOT"
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
