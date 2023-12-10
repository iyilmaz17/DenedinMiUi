import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  dateFormatPipe: any;
  
  constructor(private productService:ProductService) {}

  ngOnInit(): void {
      this.getProducts()
  }

  getProducts() {
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data
      console.log(this.products)
    })   
  }
  formatAddedDate(addedDate: string): string {
    return this.dateFormatPipe.transform(addedDate);
  }

}