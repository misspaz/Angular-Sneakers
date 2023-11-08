import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  url: string = 'http://localhost:3000/store'

 constructor(private httpCliente: HttpClient) {}

  findAll(): Observable<IProduct[]>{
    return this.httpCliente.get<IProduct[]>(this.url);
  }

  findById(id: number): Observable<IProduct>{
    return this.httpCliente.get<IProduct>(`${this.url}/${id}`);
  }

  findByCategory(category: string): Observable<IProduct[]> {
    return this.httpCliente.get<IProduct[]>(`${this.url}/?category=${category}`);
  }

  create(store: IProduct): Observable<IProduct>{
    return this.httpCliente.post<IProduct>(this.url, store);
  }

  update(store: IProduct): Observable<IProduct>{
    return this.httpCliente.put<IProduct>(`${this.url}/${store.id}`, store);
  }

  delete(id: number): Observable<IProduct>{
    return this.httpCliente.delete<IProduct>(`${this.url}/${id}`);
  }
}
