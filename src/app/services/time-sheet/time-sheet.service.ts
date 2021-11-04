import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  ITimeSheet,
  ITimeSheetCore,
  TimeSheetCore,
} from 'src/app/models/time-sheet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService {
  private readonly BASE_URL = environment.API_URL + 'timesheet/';

  dataChange: BehaviorSubject<ITimeSheetCore[]> = new BehaviorSubject<
    ITimeSheetCore[]
  >([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private _httpClient: HttpClient) {}

  getTimeSheetsByMonth(
    startDate: Date,
    endDate: Date
  ): Observable<ITimeSheetCore[]> {
    return this._httpClient.get<ITimeSheetCore[]>(this.BASE_URL + 'getByMonth', {
      params: new HttpParams()
        .set('startDate', startDate.toString())
        .set('endDate', endDate.toString()),
    });
  }

  getTimeSheetById(ITimeSheetId: string): Observable<ITimeSheetCore> {
    return this._httpClient
      .get<ITimeSheetCore>(this.BASE_URL + 'get/' + ITimeSheetId)
      .pipe(
        tap((_) => console.log('got TimeSheet by Id')),
        catchError(this.handleError<ITimeSheetCore>('get one by id'))
      );
  }

  getTimeSheetByDay(date: Date): Observable<ITimeSheetCore> {
    return this._httpClient
      .get<TimeSheetCore>(this.BASE_URL + 'getByDay/' + date)
      .pipe(
        tap((_) => console.log('got TimeSheet by date')),
        catchError(this.handleError<ITimeSheetCore>('get one by day'))
      );
  }

  addTimeSheet(ITimeSheet: ITimeSheet): Observable<ITimeSheet> {
    return this._httpClient
      .post<ITimeSheet>(
        this.BASE_URL + 'create-ts',
        ITimeSheet,
        this.httpOptions
      )
      .pipe(
        tap((newITimeSheet: ITimeSheet) => console.log(newITimeSheet)),
        catchError(this.handleError<ITimeSheet>('add'))
      );
  }

  updateTimeSheet(
    ITimeSheet: ITimeSheetCore,
    ITimeSheetId: number
  ): Observable<any> {
    return this._httpClient
      .put(
        this.BASE_URL + 'update-ts/' + ITimeSheetId,
        ITimeSheet,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log('updated TimeSheet')),
        catchError(this.handleError<any>('update'))
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
