import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITimeSheet, ITimeSheetCore } from 'src/app/models/time-sheet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {
  private readonly BASE_URL = environment.API_URL + 'timesheet/';

  dataChange: BehaviorSubject<ITimeSheetCore[]> = new BehaviorSubject<ITimeSheetCore[]>([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getTimeSheets(pageNumber:number) : Observable<ITimeSheetCore[]> {
    return this.httpClient.get<ITimeSheetCore[]>(this.BASE_URL + 'get-countries', { params: { page: pageNumber } })
  }

  getTimeSheet(ITimeSheetId:number): Observable<ITimeSheetCore> {
    return this.httpClient.get<ITimeSheetCore>(this.BASE_URL + 'get-country/' + ITimeSheetId).pipe(
      tap(_ => console.log('got TimeSheet')),
      catchError(this.handleError<ITimeSheetCore>('get one'))
    );
  }

  addTimeSheet(ITimeSheet: ITimeSheet) : Observable<ITimeSheet> {
    return this.httpClient.post<ITimeSheet>(this.BASE_URL + 'create-country', ITimeSheet, this.httpOptions).pipe(
      tap((newITimeSheet: ITimeSheet) => console.log(newITimeSheet)),
      catchError(this.handleError<ITimeSheet>('add'))
    );
  }

  updateTimeSheet(ITimeSheet: ITimeSheetCore, ITimeSheetId: number): Observable<any> {
    return this.httpClient.put(this.BASE_URL + 'update-country/' + ITimeSheetId, ITimeSheet, this.httpOptions).pipe(
      tap(_ => console.log('updated TimeSheet')),
      catchError(this.handleError<any>('update'))
    );
  }

  deleteTimeSheet(ITimeSheetId: number): Observable<ITimeSheet> {
    return this.httpClient.delete<ITimeSheet>(this.BASE_URL + 'delete/' + ITimeSheetId, this.httpOptions).pipe(
      tap(_ => console.log(`deleted TimeSheet`)),
      catchError(this.handleError<ITimeSheet>('delete'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(operation);
      return of(result as T);
    };
  }

}
