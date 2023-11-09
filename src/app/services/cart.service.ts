import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public grandTotal = new BehaviorSubject<number>(0);

  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.updateGrandTotal();
    console.log(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.price;
    });
    return grandTotal;
  }
  updateGrandTotal() {
    this.grandTotal.next(this.getTotalPrice());
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((a: any) => a.id !== product.id);
    this.productList.next(this.cartItemList);
    this.updateGrandTotal(); 
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
