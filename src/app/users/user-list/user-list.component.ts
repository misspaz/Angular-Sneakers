import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  
  selectedCity: any = '';
  httpCliente: any;

  constructor(private userService: UserService, private router: Router) { }
  ngOnInit(): void {
    console.log("OK");
    this.findAll();
  }

  findAll(): void {
    console.log('Fetching users...');
    this.userService.findAll().subscribe((data) => {
      console.log('Users fetched:', data);
      this.users = data;
    });
  }

  findUserByCity(): void {
    this.userService.findUserByCity(this.selectedCity).subscribe((data) => {
      this.users = data;
    });
  }

  navigateToUserDetail(id: number) {
    this.router.navigate(['users/users', id]);
  }

  deleteUser(id: number): void {
    this.userService.delete(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);
    });
  }
}
