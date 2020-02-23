import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {User} from "../models/user";
import {BehaviorSubject, config, Observable, of, Subject} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {DecimalPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _users$ = new BehaviorSubject<User[]>([]);
  _total$ = new BehaviorSubject<number>(0);
  private _search$ = new Subject<void>();

  get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }

  constructor(private pipe: DecimalPipe,
              private http: HttpClient) {
    console.log('constructor---');

    this.findUsers('','',0,3).subscribe(response =>{
        this._users$.next(response.body);
        this._total$.next(parseInt(response.headers.get('x-total-count')));
      })

  }

  register(user: User) {
    console.log('user service register...'+user);
    return this.http.post(`http://localhost:5000/users/register`, user);
  }

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
