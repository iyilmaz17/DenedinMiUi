import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomeComponent},
  {path:"category", component:CategoryComponent},
  {path:"product", component:ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
