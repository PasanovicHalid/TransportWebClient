import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LawSearchEngineService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  baseContractPath: string = "/api/contracts/"
  baseLawPath: string = "/api/laws/"
  baseDocumentPath: string = "/api/documents/"

  constructor(private http: HttpClient) { }

  public searchContract(request: any) : Observable<any> {
    return this.http.post(this.baseContractPath + "search", request, { headers: this.headers });
  }

  public searchLaw(request: any) : Observable<any> {
    return this.http.post<any>(this.baseLawPath + "search", request, { headers: this.headers });
  }

  public downloadDocument(document: any) : Observable<any> {
    return this.http.get(this.baseDocumentPath + "get", { 
      params: { documentPath: document },
      responseType: 'blob' 
    });
  }

  public uploadContract(file: any) : Observable<any> {
    const formData = new FormData();
    formData.append('contract', file);
    return this.http.post(this.baseContractPath + "new", formData);
  }

  public uploadLaw(file: any) : Observable<any> {
    const formData = new FormData();
    formData.append('law', file);
    return this.http.post(this.baseLawPath + "new", formData);
  }
}
