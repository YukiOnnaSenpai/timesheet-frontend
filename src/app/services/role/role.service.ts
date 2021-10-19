import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IRole, IRoleCore } from 'src/app/models/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly BASE_URL = environment.API_URL + 'role/';

  dataChange: BehaviorSubject<IRoleCore[]> = new BehaviorSubject<IRoleCore[]>([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getRoles(pageNumber:number) : Observable<IRoleCore[]> {
    return this.httpClient.get<IRoleCore[]>(this.BASE_URL + 'get-roles', { params: { page: pageNumber } })
  }

  getRole(IRoleId:number): Observable<IRoleCore> {
    return this.httpClient.get<IRoleCore>(this.BASE_URL + 'get-role/' + IRoleId).pipe(
      tap(_ => console.log('got Role')),
      catchError(this.handleError<IRoleCore>('get one'))
    );
  }

  addRole(IRole: IRole) : Observable<IRole> {
    return this.httpClient.post<IRole>(this.BASE_URL + 'create-role', IRole, this.httpOptions).pipe(
      tap((newIRole: IRole) => console.log(newIRole)),
      catchError(this.handleError<IRole>('add'))
    );
  }

  updateRole(IRole: IRoleCore, IRoleId: number): Observable<any> {
    return this.httpClient.put(this.BASE_URL + 'update-role/' + IRoleId, IRole, this.httpOptions).pipe(
      tap(_ => console.log('updated Role')),
      catchError(this.handleError<any>('update'))
    );
  }

  deleteRole(IRoleId: number): Observable<IRole> {
    return this.httpClient.delete<IRole>(this.BASE_URL + 'delete/' + IRoleId, this.httpOptions).pipe(
      tap(_ => console.log(`deleted Role`)),
      catchError(this.handleError<IRole>('delete'))
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
