import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { TOKEN, userUrl } from './shared/constants';
import { jwtDecode } from 'jwt-decode';

export interface Token {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = "http://localhost:3000/users";


  private isAuthenticaded: boolean = false;
  private userId: any;


  isAdmin = new BehaviorSubject<boolean>(this.hasAdminToken());
  isOwner = new BehaviorSubject<boolean>(this.hasOwnerToken());
  isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  currentUserName = new BehaviorSubject<string>(this.getCurrentUserName());

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<{success: boolean, id?: any, token?: string}> {
    return this.httpClient.get<any[]>(`${this.url}`).pipe(
      map((users) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.isAuthenticaded = true;
          this.userId = user.id;
          console.log("you are logged!");
          this.router.navigate(['/products'])
          return { success: true, id: user.id, token: 'smulated-token' };
        } else {
          return { success: false };
        }
      })
    );
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}`, user);
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/auth/login']);
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

  hasToken(): boolean {
    console.log('checking hasToken()');
    return localStorage.getItem(TOKEN) !== null;
  }

  handleLoginResponse(token: any) {
    localStorage.setItem(TOKEN, token);
    let decoded_token: Token = jwtDecode(token);
    this.isAdmin.next(decoded_token.role === 'admin');
    this.isOwner.next(decoded_token.role === 'owner');
    this.isLoggedIn.next(true);
    this.currentUserName.next(decoded_token.username);
  }
}
