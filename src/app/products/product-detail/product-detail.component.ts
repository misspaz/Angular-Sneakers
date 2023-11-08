import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {

  
  product: IProduct | undefined;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = parseInt(params['id'], undefined);
      this.productService.findById(id).subscribe((data) => {
        this.product = data;
      });
    });
  }
}
