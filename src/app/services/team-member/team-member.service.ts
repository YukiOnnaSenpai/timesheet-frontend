import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ITeamMember, ITeamMemberCore } from 'src/app/models/team-member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  private readonly BASE_URL = environment.API_URL + 'teammember/';

  dataChange: BehaviorSubject<ITeamMemberCore[]> = new BehaviorSubject<
    ITeamMemberCore[]
  >([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getTeamMembers(pageNumber: number): Observable<ITeamMemberCore[]> {
    return this.httpClient.get<ITeamMemberCore[]>(this.BASE_URL + 'get-tms', {
      params: { page: pageNumber },
    });
  }

  getTeamMember(ITeamMemberId: number): Observable<ITeamMemberCore> {
    return this.httpClient
      .get<ITeamMemberCore>(this.BASE_URL + 'get-tm/' + ITeamMemberId)
      .pipe(
        tap((_) => console.log('got TeamMember')),
        catchError(this.handleError<ITeamMemberCore>('get one'))
      );
  }

  addTeamMember(ITeamMember: ITeamMember): Observable<ITeamMember> {
    return this.httpClient
      .post<ITeamMember>(
        this.BASE_URL + 'create-tm',
        ITeamMember,
        this.httpOptions
      )
      .pipe(
        tap((newITeamMember: ITeamMember) => console.log(newITeamMember)),
        catchError(this.handleError<ITeamMember>('add'))
      );
  }

  updateTeamMember(
    ITeamMember: ITeamMemberCore,
    ITeamMemberId: number
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + 'update-member/' + ITeamMemberId,
        ITeamMember,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log('updated TeamMember')),
        catchError(this.handleError<any>('update'))
      );
  }

  deleteTeamMember(ITeamMemberId: number): Observable<ITeamMember> {
    return this.httpClient
      .delete<ITeamMember>(
        this.BASE_URL + 'delete/' + ITeamMemberId,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`deleted TeamMember`)),
        catchError(this.handleError<ITeamMember>('delete'))
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
