import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICategory, ICategoryCore } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly BASE_URL = environment.API_URL + 'category/';

  dataChange: BehaviorSubject<ICategoryCore[]> = new BehaviorSubject<
    ICategoryCore[]
  >([]);
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getCategories(pageNumber: number): Observable<ICategoryCore[]> {
    return this.httpClient.get<ICategoryCore[]>(
      this.BASE_URL + 'get-categories',
      { params: { page: pageNumber } }
    );
  }

  getCategory(ICategoryId: number): Observable<ICategoryCore> {
    return this.httpClient
      .get<ICategoryCore>(this.BASE_URL + 'get-category/' + ICategoryId)
      .pipe(
        tap((_) => console.log('got Category')),
        catchError(this.handleError<ICategoryCore>('get one'))
      );
  }

  addCategory(ICategory: ICategory): Observable<ICategory> {
    return this.httpClient
      .post<ICategory>(
        this.BASE_URL + 'create-category',
        ICategory,
        this.httpOptions
      )
      .pipe(
        tap((newICategory: ICategory) => console.log(newICategory)),
        catchError(this.handleError<ICategory>('add'))
      );
  }

  updateCategory(
    ICategory: ICategoryCore,
    ICategoryId: number
  ): Observable<any> {
    return this.httpClient
      .put(
        this.BASE_URL + 'update-category/' + ICategoryId,
        ICategory,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log('updated Category')),
        catchError(this.handleError<any>('update'))
      );
  }

  deleteCategory(ICategoryId: number): Observable<ICategory> {
    return this.httpClient
      .delete<ICategory>(
        this.BASE_URL + 'delete/' + ICategoryId,
        this.httpOptions
      )
      .pipe(
        tap((_) => console.log(`deleted Category`)),
        catchError(this.handleError<ICategory>('delete'))
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
