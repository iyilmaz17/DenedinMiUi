import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from './pipes/filter.pipe';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CategoryComponent,
    ProductComponent,
    HomeComponent,
    DateFormatPipe,
    LoginComponent,
    RegisterComponent,
    FilterPipe,
    CategoryDetailComponent,
    ProductDetailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
