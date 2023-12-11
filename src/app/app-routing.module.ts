import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { EditFormComponent } from './products/edit-form/edit-form.component';
import { Product } from './products/product.model';

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'create-product', component: ProductFormComponent},
  {path: 'update-product', component: EditFormComponent, data: {}},
  {path: 'product/:id', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
