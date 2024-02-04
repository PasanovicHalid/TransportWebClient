import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SearchOperator } from 'src/app/landing-pages/dashboard/dashboard.component';
import { LawSearchEngineService } from 'src/app/services/law-search-engine.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  public searchOptions: string[] = [];
  public searchOpetator = SearchOperator;

  public field: string = "";
  public value: string = "";
  public operator: SearchOperator = SearchOperator.AND;

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

    this.lawSearchEngineService.searchLaw({search: this.searchOptions}).subscribe({
      next: (response) => {
        this.searchResults = response;
      },
      error: (error) => {
        this.toastr.error(error.error.title);
      }
    });
  }

}
