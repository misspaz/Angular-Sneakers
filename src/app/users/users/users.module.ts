import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from '../user-detail/user-detail.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from '../user-list/user-list.component';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [UserDetailComponent, UserListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    HttpClientModule,
  ],
  exports: [UserDetailComponent, UserListComponent],
})
export class UsersModule {}
