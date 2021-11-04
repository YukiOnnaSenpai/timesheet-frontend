import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProject, IProjectCore } from 'src/app/models/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly BASE_URL = environment.API_URL + 'project/';

  dataChange: BehaviorSubject<IProjectCore[]> = new BehaviorSubject<
    IProjectCore[]
  >([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private _httpClient: HttpClient) {}

  getProjects(pageNumber: number): Observable<IProjectCore[]> {
    return this._httpClient.get<IProjectCore[]>(
      this.BASE_URL + 'get-projects',
      {
        params: { page: pageNumber },
      }
    );
  }

  getProject(IProjectId: number): Observable<IProjectCore> {
    return this._httpClient
      .get<IProjectCore>(this.BASE_URL + 'get-project/' + IProjectId)
      .pipe(
        tap((_) => console.log('got Project')),
        catchError(this.handleError<IProjectCore>('get one'))
      );
  }

  addProject(IProject: IProject): Observable<IProject> {
    return this._httpClient
      .post<IProject>(
        this.BASE_URL + 'create-project',
        IProject,
        this.httpOptions
      )
      .pipe(
        tap((newIProject: IProject) => console.log(newIProject)),
        catchError(this.handleError<IProject>('add'))
      );
  }

  updateProject(
    IProjectUpdate: IProjectCore,
    IProjectUpdateId: number
  ): Observable<any> {
    return this._httpClient
      .put(
        this.BASE_URL + 'update-project/' + IProjectUpdateId,
        IProjectUpdate,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log('updated Project')),
        catchError(this.handleError<any>('update'))
      );
  }

  deleteProject(IProjectId: number): Observable<IProject> {
    return this._httpClient
      .delete<IProject>(
        this.BASE_URL + 'delete/' + IProjectId,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`deleted Project`)),
        catchError(this.handleError<IProject>('delete'))
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
