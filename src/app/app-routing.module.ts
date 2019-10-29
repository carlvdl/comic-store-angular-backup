import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GradingListComponent} from "./grading-list/grading-list.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserListComponent} from "./user-list/user-list.component";
import {RoleListComponent} from "./role-list/role-list.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {PublisherEditComponent} from './publisher-edit/publisher-edit.component';
import {PublisherListComponent} from './publisher-list/publisher-list.component';
import {RoleEditComponent} from './role-edit/role-edit.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },

  //comic admin
  { path: 'gradings', component: GradingListComponent },
  { path: 'publishers', component: PublisherListComponent },
  { path: 'publisher/:id', component: PublisherEditComponent },
  { path: 'publisher', component: PublisherEditComponent },
  { path: 'titles', component: GradingListComponent },

  { path: 'orders', component: GradingListComponent },


  //users
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },

  { path: 'user/:id', component: UserEditComponent },
  { path: 'users', component: UserListComponent },

  { path: 'roles', component: RoleListComponent },
  { path: 'roles/:id', component: RoleEditComponent },


  { path: 'dashboard', component: GradingListComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
