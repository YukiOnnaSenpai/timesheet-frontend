import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICountry, ICountryCore } from 'src/app/models/country';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly BASE_URL = environment.API_URL + 'country/';

  dataChange: BehaviorSubject<ICountryCore[]> = new BehaviorSubject<ICountryCore[]>([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getCountries(pageNumber:number) : Observable<ICountryCore[]> {
    return this.httpClient.get<ICountryCore[]>(this.BASE_URL + 'get-countries', { params: { page: pageNumber } })
  }

  getCountry(ICountryId:number): Observable<ICountryCore> {
    return this.httpClient.get<ICountryCore>(this.BASE_URL + 'get-country/' + ICountryId).pipe(
      tap(_ => console.log('got Country')),
      catchError(this.handleError<ICountryCore>('get one'))
    );
  }

  addCountry(ICountry: ICountry) : Observable<ICountry> {
    return this.httpClient.post<ICountry>(this.BASE_URL + 'create-country', ICountry, this.httpOptions).pipe(
      tap((newICountry: ICountry) => console.log(newICountry)),
      catchError(this.handleError<ICountry>('add'))
    );
  }

  updateCountry(ICountry: ICountryCore, ICountryId: number): Observable<any> {
    return this.httpClient.put(this.BASE_URL + 'update-country/' + ICountryId, ICountry, this.httpOptions).pipe(
      tap(_ => console.log('updated Country')),
      catchError(this.handleError<any>('update'))
    );
  }

  deleteCountry(ICountryId: number): Observable<ICountry> {
    return this.httpClient.delete<ICountry>(this.BASE_URL + 'delete/' + ICountryId, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Country`)),
      catchError(this.handleError<ICountry>('delete'))
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
