import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // countries$: Observable<Country[]>;
  // total$: Observable<number>;
  //
  // filter = new FormControl('');
  users$: Observable<User[]>;
  total$: Observable<number>;


  constructor(
    private pipe: DecimalPipe,
    private userService: UserService) {

    this.users$ = userService.users$;
    this.total$ = userService.total$;
    console.log('users$--> '+this.users$.subscribe());

  }



  ngOnInit() {
  }

  // getUsers(): void {
  //   this.userService.getUsers()
  //     .subscribe(users => {
  //       this.users = users
  //       console.log(this.users);
  //     });
  // }


}
