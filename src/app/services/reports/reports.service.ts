import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IReports } from 'src/app/models/reports';
import { ITimeSheetCore } from 'src/app/models/time-sheet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly BASE_URL = environment.API_URL + 'reports/';

  dataChange: BehaviorSubject<ITimeSheetCore[]> = new BehaviorSubject<ITimeSheetCore[]>([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getReports(queryString: IReports[]): Observable<ITimeSheetCore[]> {
    return this.httpClient.get<ITimeSheetCore[]>(
      this.BASE_URL + 'get-reports',
      { params: this.returnAsHttpParams(queryString)  }
    );
  }

  returnAsHttpParams(queryString: IReports[]) {
    let params = new HttpParams();
    queryString.forEach(record => {
      params = params.set(record.name, record.value)
    });
    return params;
  }
  //   return new HttpParams()
  //     .set('categoryId', queryString.categoryId)
  //     .set('teamMemberId', queryString.teamMemberId)
  //     .set('clientId', queryString.clientId)
  //     .set('startDate', queryString.startDate.toString())
  //     .set('endDate', queryString.endDate.toString());
  // }
}
