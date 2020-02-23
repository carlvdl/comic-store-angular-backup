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


  users$: Observable<User[]>;
  total$: Observable<number>;


  constructor(
    private pipe: DecimalPipe,
    private userService: UserService) {
    console.log('constructor--> ');
    this.getUsers(0);
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  getUsers(pageNumber: number): void {
    this.userService.findUsers( '', 'asc', pageNumber, 3).subscribe(response =>{
      console.log("getting users for page ")
      console.log(pageNumber)
      this.users$ = this.userService.users$;
      this.total$ = this.userService.total$;
    })
  }


  filterOffsetPage(pageNumber: number) {
    console.log('pageNumber');
    console.log(pageNumber-1);
    this.getUsers(pageNumber-1)
  }
}
