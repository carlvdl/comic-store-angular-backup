import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../models/user";
import {config, Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  register(user: User) {
    console.log('user service register...'+user);
    return this.http.post(`http://localhost:5000/users/register`, user);
  }

  getUsers():Observable<User[]> {
    console.log('getting users..')
    let users$ = this.http.get<User[]>('http://localhost:5000/users')
        .pipe(
          tap(_ => console.log('fetched users...')),
          catchError(this.handleError<User[]>('getHeroes', []))
        );
    console.log('returning users$--> '+users$);
    return users$;
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
