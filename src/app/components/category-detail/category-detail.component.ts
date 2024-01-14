import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Home } from 'src/app/models/home';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  
  products:Home[]=[];
  constructor(private productService:ProductService,private activatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getProduct(params["id"])
    })
  }
  getProduct(categoryId:number){
    this.productService.getAllByCategoryId(categoryId).subscribe(response=>{
      this.products = response.data
    })
  }

}
