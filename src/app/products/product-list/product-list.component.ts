import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public productList: any;
  public totalItem: number = 0;
  products: IProduct[] = [];
  selectedCategory: string = '';
  httpCliente: any;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.findAll()
    this.cartService.getProducts().subscribe((data) => {
      this.totalItem = data.length;
    });
  }

  findAll(): void {
    this.productService.findAll().subscribe((data) => {
      this.products = data;
    });
  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }

  searchByCategory(): void {
    this.productService
      .findByCategory(this.selectedCategory)
      .subscribe((data) => {
        this.products = data;
      });
  }

  navigateToProductDetail(id: number) {
    this.router.navigate(['products/detail', id]);
  }

  navigateToProductEdit(id: number) {
    this.router.navigate(['products/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
