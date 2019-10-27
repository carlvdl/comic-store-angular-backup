import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../models/user';
import {first} from 'rxjs/operators';
import {PublisherService} from '../services/publisher.service';
import {Publisher} from '../models/publisher';

@Component({
  selector: 'app-publisher-edit',
  templateUrl: './publisher-edit.component.html',
  styleUrls: ['./publisher-edit.component.css']
})
export class PublisherEditComponent implements OnInit {

  publisherForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    public publisherService: PublisherService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('PublisherComponent...');

    this.publisherForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });

    this.returnUrl = 'dashboard'
  }


  // convenience getter nfor easy access to form fields
  get f() { return this.publisherForm.controls; }


  onSubmit() {
    console.log('onSubmit');

    this.submitted = true;

    // stop here if form is invalid
    if (this.publisherForm.invalid) {
      return;
    }

    const user = new User();
    let code = this.publisherForm.value.code;
    let description = this.publisherForm.value.description;

    this.loading = true;

    let publisher = new Publisher();
    publisher.code = code;
    publisher.description = description;

    this.publisherService.addPublisher(publisher)
      .pipe(first())
      .subscribe(
        data => {
          console.log('debugging data from server, publisher create ');
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

    //
    // this.publisherService.login(this.loginForm.value.email, this.loginForm.value.password)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log('debugging data from server ');
    //       console.log(data);
    //       console.log(this.returnUrl);
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       // this.alertService.error(error);
    //       console.log('Use an alert service for the error:')
    //       console.log(error)
    //       this.loading = false;
    //     });
  }

}
