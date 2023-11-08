import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsRoutingModule } from './products/products/products-routing.module';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductsRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
