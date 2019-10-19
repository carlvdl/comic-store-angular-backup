import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {AuthenticationService} from "../services/authentication.service";
import { first } from 'rxjs/operators';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
              public userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) { }


  /*
    could use
    let returnUrl  = this.route.snapshot.queryParams['returnUrl'];
    to take user to where they were
   */
  ngOnInit() {
    console.log('UserLoginComponent...');

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.returnUrl = 'dashboard'
  }

  // convenience getter nfor easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log('onSubmit');

    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    const user = new User();
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    this.loading = true;
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log('debugging data from server ');
          console.log(data);
          console.log(this.returnUrl);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.alertService.error(error);
          console.log('Use an alert service for the error:')
          console.log(error)
          this.loading = false;
        });
  }

}
