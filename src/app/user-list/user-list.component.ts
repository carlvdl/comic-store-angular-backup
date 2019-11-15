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

  response$: Observable<HttpResponse<User[]>>;
  users$: Observable<User[]>;
  // users: User[];
  filter = new FormControl('');
  total$: Observable<number>;


  // this.publishersSubject.next(response.body);
  // this.publishersCount = parseInt(response.headers.get('x-total-count'));

  constructor(
    private pipe: DecimalPipe,
    private userService: UserService) {

    this.users$ = userService.users$;
    this.total$ = userService.total$;
    console.log('users$--> '+this.users$.subscribe());

    // this.response$ = userService.getUsers('','',0,3,);
    // userService.getUsers('','',0,3).subscribe(
    //   response => {
    //     this.users$ = response.body;
    //     this.publishersCount = parseInt(response.headers.get('x-total-count'));
    //     console.log('PublishersCount...'+this.publishersCount);
    //     // this.setPublishersCount(this.publishersCount);
    //     this.loadingSubject.next(false);
    //   });
    // // this.total$ = userService.getTotals();

  }




  // this.countries$ = service.countries$;
  // this.total$ = service.total$;

  ngOnInit() {
    // this.getUsers();
  }

  // getUsers(): void {
  //   this.userService.getUsers()
  //     .subscribe(users => {
  //       this.users = users
  //       console.log(this.users);
  //     });
  // }


}
