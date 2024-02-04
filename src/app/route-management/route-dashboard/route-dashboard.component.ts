import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LawSearchEngineService } from 'src/app/services/law-search-engine.service';
@Component({
  selector: 'app-route-dashboard',
  templateUrl: './route-dashboard.component.html',
  styleUrls: ['./route-dashboard.component.scss']
})
export class RouteDashboardComponent implements OnInit {
  constructor(private lawSearchEngineService: LawSearchEngineService, private toastr: ToastrService) { }

  selectedFile: any = null;
  documentType: string | undefined;

  ngOnInit(): void {

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  uploadFile(): void {
    if(this.documentType == undefined){
      this.toastr.error("Please select a document type");
      return;
    }
    if(this.selectedFile == null){
      this.toastr.error("Please select a file");
      return;
    }
    if(this.documentType == "contract"){
      this.lawSearchEngineService.uploadContract(this.selectedFile).subscribe({
        next: (response) => {
          this.toastr.success("Contract uploaded successfully");
        },
        error: (error) => {
          this.toastr.error(error.error.title);
        }
      });
    }
    else if(this.documentType == "law"){
      this.lawSearchEngineService.uploadLaw(this.selectedFile).subscribe({
        next: (response) => {
          this.toastr.success("Law uploaded successfully");
        },
        error: (error) => {
          this.toastr.error(error.error.title);
        }
      });
    }
  }
}
