import {Component, OnInit} from '@angular/core';
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
  publisher: Publisher;
  addNew:boolean;

  constructor(
    private formBuilder: FormBuilder,
    public publisherService: PublisherService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

    this.returnUrl = 'publishers';
    console.log('PublisherComponent...');
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('id--> '+id);
    if (id > 0){

      console.log("Proceed to edit publisher...");
      this.getPublisher(id);
      this.addNew = false;

    }else{

      console.log("Proceed to add new publisher...");
      this.publisherForm = this.formBuilder.group({
        code: ['', [Validators.required, Validators.minLength(2)]],
        description: ['', [Validators.required, Validators.minLength(3)]]
      });
      this.publisher = new Publisher();
      this.addNew = true;
    }



  }


  getPublisher(id): void {
    this.publisherService.getPublisher(id)
      .subscribe(publisher => {
        this.publisher = publisher;
        console.log('got a publisher-->' + this.publisher);
      });
  }

  // convenience getter nfor easy access to form fields
  get f() {
    return this.publisherForm.controls;
  }


  onSubmit() {
    console.log('onSubmit');
    this.submitted = true;

    // stop here if form is invalid
    console.log('validating...1..');
    console.log(this.publisherForm);
    if (this.publisherForm.invalid) {
      console.log('validating...2..');
      return;
    }
    console.log('validating...3..');



    let publisherId = this.publisher.id;
    console.log('publisherId--> ' + publisherId);

    if (publisherId) {
      console.log('editing...');
      this.publisherService.updatePublisher(this.publisher)
        .subscribe(() =>{
          // this.location.back()
          console.log('Updating...');
          this.router.navigate([this.returnUrl]);
        }
    );

    } else {

      console.log('adding...');
      this.loading = true;
      this.publisherService.createPublisher(this.publisher)
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
            console.log('Use an alert service for the error:');
            console.log(error);
            this.loading = false;
          });
    }


  }

}
