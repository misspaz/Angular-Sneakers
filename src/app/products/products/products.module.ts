import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';

// import {MatGridListModule} from '@angular/material/grid-list';
// MatGridListModule

@NgModule({
  declarations: [
    ProductListComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, ReactiveFormsModule, FormsModule, InputTextModule, CheckboxModule, RadioButtonModule ],

  exports: [
    ProductListComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductEditComponent
  ],
})
export class ProductsModule {}
