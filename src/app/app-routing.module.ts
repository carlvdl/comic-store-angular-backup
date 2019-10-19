import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GradingListComponent} from "./grading-list/grading-list.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserListComponent} from "./user-list/user-list.component";
import {RoleListComponent} from "./role-list/role-list.component";
import {UserEditComponent} from "./user-edit/user-edit.component";

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },

  { path: 'gradings', component: GradingListComponent },
  { path: 'publishers', component: GradingListComponent },
  { path: 'titles', component: GradingListComponent },

  { path: 'orders', component: GradingListComponent },

  { path: 'users/:id', component: UserEditComponent },
  { path: 'users', component: UserListComponent },
  { path: 'roles', component: RoleListComponent },

  { path: 'dashboard', component: GradingListComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
