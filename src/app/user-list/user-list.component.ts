import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {User} from "../models/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // users$: Observable<User[]>;
  users: User[];
  filter = new FormControl('');

  constructor(
    private pipe: DecimalPipe,
    private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users
        console.log(this.users);
      });
  }


}
