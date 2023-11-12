import { UserService } from './../services/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  updateMessage: string = '';
  userForm = new FormGroup({
  username: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required]),
  isOwner: new FormControl(false),
  });

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}


    save(): void {
      if (this.userForm.valid) {
        let id = this.userForm.get('id')?.value ?? 0;
        let email = this.userForm.get('email')?.value ?? '';
        let username = this.userForm.get('username')?.value ?? '';
        let password = this.userForm.get('password')?.value ?? '';
        let firstname = this.userForm.get('firstname')?.value ?? '';
        let lastname = this.userForm.get('lastname')?.value ?? '';
  
        let user: IUser = {
          id: id,
          email: email,
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
        };
  
        this.authService.register(user).subscribe((data) => {
          console.log('Producto subido correctamente', data);
          this.resetForm();
        });
  
        this.updateMessage = 'Sneaker created!';
      } else {
        console.log('Formulario no válido');
      }
    }

    resetForm(): void {
      this.userForm.reset();
    }
    userId?: number;



    // save() {

    //   let register = {
    //     username: this.userForm.get('username')?.value ?? '',
    //     email: this.userForm.get('email')?.value ?? '',
    //     password: this.userForm.get('password')?.value ?? '',
    //     isOwner: this.userForm.get('isOwner')?.value ?? false,
    //   }
  
    //   this.authService.register(register).subscribe((data: { token: any; }) => {
    //     console.log(data.token);
    //     this.authService.handleLoginResponse(data.token);
    //     this.router.navigate(['/products']);
  
    //   });
  
    // }


}
