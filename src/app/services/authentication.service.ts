import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /*
  TODO handle no auth token or no login
   */
  login(email: string, password: string) {
    console.log('AuthenticationService, login...');

    return this.http.post<any>(`http://localhost:5000/users/authenticate`, { email, password })
      .pipe(map(user => {
        console.log('user--->');
        console.log(user  );

        // login successful if there's a jwt token in the response
        if (user && user.auth_token) {
          // console.log('user && user.auth_token.....')

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

        } else {
          console.log('NO auth_token.....')

        }

        return user;
      }));
  }

  authenticated(){
    const currentUser = localStorage.getItem('currentUser')
    var parsedData = JSON.parse(currentUser);
    if ((parsedData != undefined) && (parsedData.auth_token != undefined)){
      return true;
    } else {
      return false;
    }

  }

  /*
  https://www.techiediaries.com/angular-tutorial-reactive-forms/
   localStorage.removeItem('ACCESS_TOKEN');
   remove user from local storage to log user out
   */
  logout() {
    console.log('AuthenticationService, logout...');

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
