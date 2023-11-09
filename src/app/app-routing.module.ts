import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsRoutingModule } from './products/products/products-routing.module';
import { CartComponent } from './products/cart/cart.component';

const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./users/auth/auth.module').then(m => m.AuthModule)
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
  {path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductsRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
