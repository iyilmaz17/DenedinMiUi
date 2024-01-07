import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Comment } from 'src/app/models/comment';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories : Category[]=[];
  products: Product[] = [];
  comments: Comment[] = [];
  comment: any;
  
  constructor(private categoryService:CategoryService,private productService:ProductService,private commentService:CommentService) { }

  ngOnInit(): void {
    this.getCategories();
    
    //this.getComment();
    this.products.forEach(product => {
      this.getComment(product.Id);
    });
    this.getProducts();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data
    })   
  }
  getProducts() {
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data
    })   
  }
  getComment(productId: number) {
    this.commentService.getByProductId(productId).subscribe(response => {
      const comment = response.data[2];
      console.log(comment);
      this.comments.push(comment);
    });
  }


}
