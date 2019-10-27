import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from '../models/user';
import {Publisher} from '../models/publisher';
import {map} from 'rxjs/operators';

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
}
