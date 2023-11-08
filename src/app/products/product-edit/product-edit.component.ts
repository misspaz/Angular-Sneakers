import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  editProductForm = new FormGroup({
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
    if (this.editProductForm.valid) {
      let id = this.editProductForm.get('id')?.value ?? 0;
      let title = this.editProductForm.get('title')?.value ?? '';
      let price = this.editProductForm.get('price')?.value ?? 0;
      let description = this.editProductForm.get('description')?.value ?? '';
      let category = this.editProductForm.get('category')?.value ?? '';
      let image = this.editProductForm.get('image')?.value ?? '';

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
    this.editProductForm.reset();
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
      this.editProductForm.patchValue(product);
    });
  }

  update(): void {
    if (this.editProductForm.valid) {
      const productData: IProduct = this.editProductForm.value as IProduct;
      this.productService.update(productData).subscribe(() => {
        console.log('Producto actualizado correctamente');
        this.resetForm();
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
