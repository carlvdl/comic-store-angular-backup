import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
// import {User} from '../models/user';
import {Publisher} from '../models/publisher';
import {catchError, map, tap} from 'rxjs/operators';
import {Config} from '../models/config';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) {
    console.log(environment.apiUrl);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createPublisher(publisherInput: Publisher) {
    console.log('%% adding a publisher %%');
    let code = publisherInput.code;
    let description = publisherInput.description;

    return this.http.post<any>(environment.apiUrl+'/publishers', {code, description})
      .pipe(map(publisher => {
        console.log('publisher result--->');
        console.log(publisher);

        // login successful if there's a jwt token in the response
        if (publisher && publisher.id) {
        } else {
          console.log('NO publisher....');
        }

        return publisher;
      }));
  }

  //edit publisher
  updatePublisher(publisher: Publisher) : Observable<Publisher> {
    console.log('%% updating a publisher %%');
    let url = 'http://localhost:5000/publishers/'+(publisher.id).toString();
    return this.http.put(url, publisher, this.httpOptions).pipe(
      tap(_ => this.log(`updated publisher id=${publisher.id}`)),
      catchError(this.handleError<any>('updatePublisher'))
    );
  }


  getPublisher(id: number): Observable<Publisher> {
    console.log('gettng Publisher by id ');
    console.log(id);
    const url = 'http://localhost:5000/publishers/'+id;
    console.log(url);

    return this.http.get<Publisher>(url).pipe(
      tap(_ => this.log ('fetched publisher id=${id}')),
      catchError(this.handleError<Publisher>('getPublisher id=${id}'))
    );
  }




  findPublishers(filter: string, sortOrder: string, pageNumber: number, pageSize: number): Observable<HttpResponse<Publisher[]>> {
    return this.http.get<Publisher[]>(
      'http://localhost:5000/publishers',
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

  private log(message: string) {
    console.log('message: '+message);
  }



}
