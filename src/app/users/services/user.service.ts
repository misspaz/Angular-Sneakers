import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  userUrl: string = 'http://localhost:3000/users'


  constructor(private httpCliente: HttpClient) { }

  findAll(): Observable<IUser[]>{

    
    return this.httpCliente.get<IUser[]>(this.userUrl);
  }

  findUserById(id: number): Observable<IUser>{
    return this.httpCliente.get<IUser>(`${this.userUrl}/${id}`);
  }

  findUserByCity(address: { city: any; }): Observable<IUser[]> {
    return this.httpCliente.get<IUser[]>(`${this.userUrl}/?city=${address.city}`);
  }

  delete(id: number): Observable<IUser>{
    return this.httpCliente.delete<IUser>(`${this.userUrl}/${id}`);
  }

}
