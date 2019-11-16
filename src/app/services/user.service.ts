import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {User} from "../models/user";
import {BehaviorSubject, config, Observable, of, Subject} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {DecimalPipe} from '@angular/common';
import {Publisher} from '../models/publisher';


interface SearchResult {
  countries: User[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // constructor(private http: HttpClient) { }

  users$ = new BehaviorSubject<User[]>([]);
  total$ = new BehaviorSubject<number>(0);
  private _search$ = new Subject<void>();

  constructor(private pipe: DecimalPipe,
              private http: HttpClient) {
      this.findUsers('','',0,3).subscribe(response =>{
        this.users$.next(response.body);
        // this.total$ = parseInt(response.headers.get('x-total-count'));
      })

  }

  register(user: User) {
    console.log('user service register...'+user);
    return this.http.post(`http://localhost:5000/users/register`, user);
  }


//
//   this.publisherService.findPublishers(filter, sortDirection, pageIndex, pageSize).subscribe(response => {
//   this.publishersSubject.next(response.body);
//   this.publishersCount = parseInt(response.headers.get('x-total-count'));
//   console.log('PublishersCount...'+this.publishersCount);
//   // this.setPublishersCount(this.publishersCount);
//   this.loadingSubject.next(false);
// });
//
  // getTotals() {
  //   return undefined;
  // }
  //
  findUsers(filter: string, sortOrder: string, pageNumber: number, pageSize: number): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(
      'http://localhost:5000/users',
      {
        observe: 'response',
        params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      });
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

  updateUser (user: User): Observable<any> {
    console.log(user.isAuthenticated)
    console.log(user.password)
    console.log('updating user...');
    let url = 'http://localhost:5000/users/'+(user.id).toString();
    return this.http.put(url, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  private log(message: string) {
    console.log('message: '+message);
  }

  // const url = `${this.heroesUrl}/${id}`;
  //http://localhost:5000/users/4
  getUser(id: number): Observable<User> {
    console.log('gettng hero by id ');
    console.log(id);
    const url = 'http://localhost:5000/users/'+id;
    console.log(url);

    return this.http.get<User>(url).pipe(
      tap(_ => this.log('fetched hero id=${id}')),
      catchError(this.handleError<User>('getUser id=${id}'))
    );
  }

}
