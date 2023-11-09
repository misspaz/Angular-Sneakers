import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOKEN, userUrl } from './shared/constants';
import { jwtDecode } from 'jwt-decode';

export interface Token {
  sub: number; // id del usuario
  username: string;
  role: string;
  exp: number; // timestamp con la fecha de expiración
  iat: number; // Issued At: campo con la fecha de emisión del token
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${userUrl}/auth`;

  isAdmin = new BehaviorSubject<boolean>(this.hasAdminToken());
  isOwner = new BehaviorSubject<boolean>(this.hasOwnerToken());
  isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  currentUserName = new BehaviorSubject<string>(this.getCurrentUserName());

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }

    login(login: any): Observable<any> {
      return this.httpClient.post(`${this.url}/login`, login);
    }
  
    register(user: any): Observable<any> {
      return this.httpClient.post(`${this.url}/register`, user);
    }
  
    logout() {
      localStorage.removeItem(TOKEN);
      this.router.navigate(['/auth/login']);
      // Cuando el usuario cierra la sesión,
      // emitimos false para isAdmin y isLoggedIn
      this.isAdmin.next(false);
      this.isOwner.next(false);
      this.isLoggedIn.next(false);
      this.currentUserName.next('');
    }
  
    getCurrentUserName(): string {
      let token = localStorage.getItem(TOKEN);
      if (!token) return '';
  
      let decoded_token: Token = jwtDecode(token);
      return decoded_token.username;
    }
  
    hasAdminToken(): boolean {
      let token = localStorage.getItem(TOKEN);
      if (!token) return false;
  
      let decoded_token: Token = jwtDecode(token);
      return decoded_token.role === 'admin';
    }
  
    hasOwnerToken(): boolean {
      let token = localStorage.getItem(TOKEN);
      if (!token) return false;
  
      let decoded_token: Token = jwtDecode(token);
      return decoded_token.role === 'owner';
    }
  
    hasToken() : boolean {
      console.log('checking hasToken()')
      return localStorage.getItem(TOKEN) !== null;
    }
  
    handleLoginResponse(token: any) {
      // Guarda el token en localStorage y actualiza el estado de isAdmin y isLoggedIn
      localStorage.setItem(TOKEN, token);
      let decoded_token: Token = jwtDecode(token);
      this.isAdmin.next(decoded_token.role === 'admin');
      this.isOwner.next(decoded_token.role === 'owner');
      this.isLoggedIn.next(true);
      this.currentUserName.next(decoded_token.username);
    }
  
  
  
}
