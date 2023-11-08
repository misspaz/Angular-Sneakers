import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';
import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [UserDetailComponent, LoginComponent, RegisterComponent, UserListComponent],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule, FormsModule, CardModule],
  exports: [UserDetailComponent, LoginComponent, RegisterComponent, UserListComponent],
})
export class UsersModule {}
