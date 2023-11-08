import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  selectedCategory: string = '';
  httpCliente: any;

  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.productService.findAll().subscribe((data) => {
      this.products = data;
    });
  }

  searchByCategory(): void {
    this.productService.findByCategory(this.selectedCategory).subscribe((data) => {
      this.products = data; // Actualiza la lista de productos con los resultados de la búsqueda
    });
  }

  navigateToProductDetail(id: number) {
    this.router.navigate(['products/detail', id]);
  }
  

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
    this.products = this.products.filter((product) => product.id !== id);
    });
  }


}
