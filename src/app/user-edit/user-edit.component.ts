import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {FormControl, FormGroup} from "@angular/forms";
import { Location } from '@angular/common';
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {


  //https://angular.io/guide/reactive-forms
  // https://www.techiediaries.com/angular-tutorial-reactive-forms/
  user: User;
  submitted = false;




  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();

  }



  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        console.log("user-->"+this.user.email);
        console.log("user-->"+this.user.password);
        console.log("We got a user, so just fucking work..");
      });
  }

  saveUser() {
    this.submitted = true;
    console.log('saveUser...');
    this.userService.updateUser(this.user)
      .subscribe(() =>
        // this.location.back()
        console.log('Updating...')
      );
  }


  goBack() {

  }
}
