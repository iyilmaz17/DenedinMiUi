import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { ProductService } from 'src/app/services/product.service';
import { Home } from 'src/app/models/home';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Commentt } from 'src/app/models/comment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300)
      ]),
      transition(':leave',
        animate(300, style({ opacity: 0 })))
    ])
  ]
})
export class HomeComponent implements OnInit {

  categories : Category[]=[];
  products: Product[] = [];
  comment: Commentt;
  homeProduct:Home[]=[];
  
  constructor(private modalService: NgbModal,private categoryService:CategoryService,private productService:ProductService,private commentService:CommentService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getHomeProducts();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data
    })   
  }
  getHomeProducts() {
    this.productService.getHomeProducts().subscribe(response=>{
      
      this.homeProduct = response.data
    })   
  }
  getComment(productId: number) {
    this.commentService.getByProductId(productId).subscribe(response => {
      this.comment = response.data;
      
    });
  }
  openProductModal(productId: number) {
    const modalRef = this.modalService.open(ProductDetailComponent);
    modalRef.componentInstance.productId = productId; 
  
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

}
