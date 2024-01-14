import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Comment } from 'src/app/models/comment';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { Home } from 'src/app/models/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories : Category[]=[];
  products: Product[] = [];
  comment: Comment;
  homeProduct:Home[]=[];
  
  constructor(private categoryService:CategoryService,private productService:ProductService,private commentService:CommentService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getHomeProducts();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data
      console.log(this.categories)
    })   
  }
  getHomeProducts() {
    this.productService.getHomeProducts().subscribe(response=>{
      
      this.homeProduct = response.data
      console.log(this.homeProduct)
    })   
  }
  getComment(productId: number) {
    this.commentService.getByProductId(productId).subscribe(response => {
      this.comment = response.data;
      console.log(this.comment.commentDescription);
      
    });
  }


}
