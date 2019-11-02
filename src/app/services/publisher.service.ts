import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user';
import {Publisher} from '../models/publisher';
import {catchError, map, tap} from 'rxjs/operators';
import {Config} from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) {
  }


  addPublisher(publisherInput: Publisher) {
    let code = publisherInput.code;
    let description = publisherInput.description;

    console.log('adding a publisher..');
    return this.http.post<any>(`http://localhost:5000/publishers`, {code, description})
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

  //edit publisher

}
