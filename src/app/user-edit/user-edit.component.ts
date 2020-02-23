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

  user: User;
  addingNew:boolean;
  submitted = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();

  }



  getUser(): void {
    console.log('getting a user by id');
    const id = +this.route.snapshot.paramMap.get('id');
    console.log('getting a user by id of '+id);
    this.userService.getUser(id)
      .subscribe(user => {
        console.log('user-->'+user);
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
