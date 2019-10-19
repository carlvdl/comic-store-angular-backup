import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;


  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private authenticationService: AuthenticationService,
               private userService: UserService,) {
    console.log('only if not logged in')
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onSubmit() {
    console.log('------')
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Registration successful')
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('Registration error')
          // this.alertService.error(error);
          this.loading = false;
        });
  }

}
