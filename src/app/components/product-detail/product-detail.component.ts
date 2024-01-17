import { Component, Input, OnInit } from '@angular/core';
import { Commentt } from 'src/app/models/comment';
import { Image } from 'src/app/models/image';
import { Product } from 'src/app/models/product';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() productId: number;
  product: Product;
  image: Image = { id: 0, productId: 0, imageUrl: '' };
  comments: Commentt[] = []
  constructor(private productService: ProductService, private commentService: CommentService, private imageService: ImageService) { }
  ngOnInit(): void {
    this.getProduct(this.productId)
    this.getImage(this.productId)
    this.getComment(this.productId)
  }

  getProduct(productId: number) {
    this.productService.getById(productId).subscribe(response => {
      this.product = response.data;
    });
  }
  getImage(productId: number) {
    this.imageService.getById(productId).subscribe(response => {
      this.image = response.data;
    });
  }
  getComment(productId: number) {
    this.commentService.getAllCommentByProductId(productId).subscribe(response => {
      this.comments = response.data;
    });
  }
}
