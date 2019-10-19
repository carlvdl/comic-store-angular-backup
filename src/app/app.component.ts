import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {UserService} from "./services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'comic-store-angular';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  authenticated() {
    const isAuthenticated = this.authenticationService.authenticated();
    return isAuthenticated;

  }

  openDialog1() {

  }

  openDialog() {

  }

  logout() {
    // localStorage.setItem('currentUser', JSON.stringify(user));
    console.log('app.component, logout...');
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');

  }
}
