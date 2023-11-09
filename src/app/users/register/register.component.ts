import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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

    save() {

      let register = {
        username: this.userForm.get('username')?.value ?? '',
        email: this.userForm.get('email')?.value ?? '',
        password: this.userForm.get('password')?.value ?? '',
        isOwner: this.userForm.get('isOwner')?.value ?? false,
      }
  
      this.authService.register(register).subscribe((data: { token: any; }) => {
        console.log(data.token);
        // Guardar el token para utilizarlo en las posteriores peticiones
        this.authService.handleLoginResponse(data.token);
        this.router.navigate(['/products']);
  
      });
  
    }


}
