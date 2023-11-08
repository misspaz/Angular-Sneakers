import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm = new FormGroup({
    id: new FormControl<number>(0),
    title: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0.01),
    ]),
    description: new FormControl<string>('', [Validators.required]),
    category: new FormControl<string>('', [Validators.required]),
    image: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  save(): void {
    if (this.productForm.valid) {
      let id = this.productForm.get('id')?.value ?? 0;
      let title = this.productForm.get('title')?.value ?? '';
      let price = this.productForm.get('price')?.value ?? 0;
      let description = this.productForm.get('description')?.value ?? '';
      let category = this.productForm.get('category')?.value ?? '';
      let image = this.productForm.get('image')?.value ?? '';

      let product: IProduct = {
        id: id,
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
      };

      this.productService.create(product).subscribe((data) => {
        console.log('Producto subido correctamente', data);
        this.resetForm();
      });
    } else {
      console.log('Formulario no válido');
    }
  }

  resetForm(): void {
    this.productForm.reset();
  }
  productId?: number;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['id'];
      if (this.productId) {
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.productService.findById(id).subscribe((product) => {
      this.productForm.patchValue(product);
    });
  }

  update(): void {
    if (this.productForm.valid) {
      const productData: IProduct = this.productForm.value as IProduct;
      this.productService.update(productData).subscribe(() => {
        console.log('Producto actualizado correctamente');
        this.resetForm();
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
