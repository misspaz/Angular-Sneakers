import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserDetailComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [UserDetailComponent, LoginComponent, RegisterComponent],
})
export class UsersModule {}
