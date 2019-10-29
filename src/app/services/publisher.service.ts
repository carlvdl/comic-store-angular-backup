import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {Publisher} from '../models/publisher';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) {

  }


  //https://angular.io/tutorial/toh-pt6

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }


  addPublisher(publisherInput: Publisher) {
    let code = publisherInput.code;
    let description = publisherInput.description;

      console.log("adding a pub");
    return this.http.post<any>(`http://localhost:5000/publishers`, { code, description })
      .pipe(map(publisher => {
        console.log('publisher result--->');
        console.log(publisher  );

        // login successful if there's a jwt token in the response
        if (publisher && publisher.id) {
        } else {
          console.log('NO publisher....')
        }

        return publisher;
      }));
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  findPublishers(filter: string, sortDirection: string, pageIndex: number, pageSize: number):Observable<Publisher[]> {
    console.log('getting Publisher in service..')
    let publisher$ = this.http.get<Publisher[]>('http://localhost:5000/publishers')
      .pipe(
        tap(_ => console.log('fetched Publisher...')),
        catchError(this.handleError<Publisher[]>('findPublishers', []))
      );
    console.log('returning publisher$--> '+publisher$);
    return publisher$;
  }


  //
  // findPublishers(filter: string, sortDirection: string, pageIndex: number, pageSize: number) {
  //
  //     return this.http.get('/api/lessons', {
  //       params: new HttpParams()
  //         .set('courseId', courseId.toString())
  //         .set('filter', filter)
  //         .set('sortOrder', sortOrder)
  //         .set('pageNumber', pageNumber.toString())
  //         .set('pageSize', pageSize.toString())
  //     }).pipe(
  //       map(res =>  res["payload"])
  //     );
  // }
  //
  // findLessons(
  //   courseId:number, filter = '', sortOrder = 'asc',
  //   pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {
  //
  //   return this.http.get('/api/lessons', {
  //     params: new HttpParams()
  //       .set('courseId', courseId.toString())
  //       .set('filter', filter)
  //       .set('sortOrder', sortOrder)
  //       .set('pageNumber', pageNumber.toString())
  //       .set('pageSize', pageSize.toString())
  //   }).pipe(
  //     map(res =>  res["payload"])
  //   );
  // }
}
