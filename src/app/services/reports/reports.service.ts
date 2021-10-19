import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITimeSheetCore } from 'src/app/models/time-sheet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private readonly BASE_URL = environment.API_URL + 'reports/';

  dataChange: BehaviorSubject<ITimeSheetCore[]> = new BehaviorSubject<ITimeSheetCore[]>([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }


  getReports(pageNumber:number) : Observable<ITimeSheetCore[]> {
    return this.httpClient.get<ITimeSheetCore[]>(this.BASE_URL + 'get-reports', { params: { page: pageNumber } })
  }
}
