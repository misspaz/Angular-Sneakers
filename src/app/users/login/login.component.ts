import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  save() {
    let login = {
      email: this.userForm.get('email')?.value ?? '',
      password: this.userForm.get('password')?.value ?? '',
    };

    this.authService.login(login.email, login.password).subscribe(
      (data: any) => {
        if (data.token) {
          console.log(data.token);
          this.authService.handleLoginResponse(data.token);
          this.router.navigate(['/products']);
        } else {
          console.error('Token not found in the response.');
        }
      },
      (error) => {
        console.error('Error during login:', error);
      }
    );
  }

}
