import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  user: IUser | undefined;
  userForm = new FormGroup({
    id: new FormControl<number>(0),
    username: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100),
    ]),
  });

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = parseInt(params['id'], undefined);
      this.userService.findUserById(id).subscribe((data) => {
        this.user = data;
      });
    });
    this.userService.findCurrentUser().subscribe((data) => {
      this.user = data;
      this.userForm.reset({
        id: this.user.id,
        username: this.user.username,
        email: this.user.email,
      });
    });
  }

  save(): void {
    let id = this.userForm.get('id')?.value ?? 0;
    let username = this.userForm.get('username')?.value ?? '';
    let email = this.userForm.get('email')?.value ?? '';

    let user: IUser = {
      id: id,
      username: username,
      email: email,
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: {
        city: '',
        street: '',
        number: 0,
        zipcode: '',
      },
    };

    this.userService
      .update(user)
      .subscribe((data) => console.log('usuario actualizado'));
  }
}
