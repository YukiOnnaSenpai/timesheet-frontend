import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IClient, IClientCore } from 'src/app/models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly BASE_URL = environment.API_URL + 'client/';

  dataChange: BehaviorSubject<IClientCore[]> = new BehaviorSubject<IClientCore[]>([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getClients(pageNumber:number) : Observable<IClientCore[]> {
    return this.httpClient.get<IClientCore[]>(this.BASE_URL + 'get-clients', { params : { page: pageNumber } })
  }

  getClient(IClientId:number): Observable<IClientCore> {
    return this.httpClient.get<IClientCore>(this.BASE_URL + 'get-client/' + IClientId).pipe(
      tap(_ => console.log('got Client')),
      catchError(this.handleError<IClientCore>('get one'))
    );
  }

  addClient(IClient: IClient) : Observable<IClient> {
    return this.httpClient.post<IClient>(this.BASE_URL + 'create-client', IClient, this.httpOptions).pipe(
      tap((newIClient: IClient) => console.log(newIClient)),
      catchError(this.handleError<IClient>('add'))
    );
  }

  updateClient(IClient: IClientCore, IClientId: number): Observable<any> {
    return this.httpClient.put(this.BASE_URL + 'update-client/' + IClientId, IClient, this.httpOptions).pipe(
      tap(_ => console.log('updated Client')),
      catchError(this.handleError<any>('update'))
    );
  }

  deleteClient(IClientId: number): Observable<IClient> {
    return this.httpClient.delete<IClient>(this.BASE_URL + 'delete/' + IClientId, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Client`)),
      catchError(this.handleError<IClient>('delete'))
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
