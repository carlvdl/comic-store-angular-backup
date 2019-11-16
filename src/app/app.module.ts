import {
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatSidenavModule, MatListModule, MatProgressBarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
// import {MaterialModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { UserRegisterComponent } from './user-register/user-register.component';
import { GradingListComponent } from './grading-list/grading-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { PublisherEditComponent } from './publisher-edit/publisher-edit.component';
import { TitleListComponent } from './title-list/title-list.component';
import { TitleEditComponent } from './title-edit/title-edit.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoleListComponent } from './role-list/role-list.component';
import {DecimalPipe} from "@angular/common";
import { RoleEditComponent } from './role-edit/role-edit.component';
// import {DecimalPipe} from "@angular/common";
import {  MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule } from "@angular/material";
// import { SortableDirective } from './sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    // SortableDirective
    UserRegisterComponent,
    GradingListComponent,
    UserListComponent,
    UserEditComponent,
    PublisherListComponent,
    PublisherEditComponent,
    TitleListComponent,
    TitleEditComponent,
    RoleListComponent,
    RoleEditComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatProgressBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
