import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Commentt } from 'src/app/models/comment';
import { Image } from 'src/app/models/image';
import { Product } from 'src/app/models/product';
import { UserTokenModel } from 'src/app/models/userTokenModel';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CommentAVG } from 'src/app/models/commentAVG';




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
  commentAddForm: FormGroup;
  userId: number | undefined;
  userName: string | undefined;
  myText: string = '';
  selectedRating: number = 0;
  loginInfo: boolean;
  commentAVG: CommentAVG;
  starsAvg:number;
  userCount:number;
  userRating: number;

  constructor(public activeModal: NgbActiveModal, private datePipe: DatePipe, private authService: AuthService, private toastrService: ToastrService, private formBuilder: FormBuilder, private productService: ProductService, private commentService: CommentService, private imageService: ImageService) { }
  ngOnInit(): void {
    this.getUserInfo()
    this.createCommentAddForm();
    this.getProduct(this.productId)
    this.getImage(this.productId)
    this.getComment(this.productId)
    this.getCommentDetailByProductId(this.productId)


  }
  generateStars(rating: number): string {
    const filledStars = '★'.repeat(Math.floor(rating)); // Dolu yıldızlar
    const emptyStars = '☆'.repeat(5 - Math.ceil(rating)); // Boş yıldızlar
    return filledStars + emptyStars;
  }
  getCommentDetailByProductId(productId: number) {
    this.commentService.getCommentDetailByProductId(productId).subscribe(response => {
      this.commentAVG = response.data
      this.starsAvg=this.commentAVG.avgStar*20
      this.userCount = this.commentAVG.userCount
      console.log(this.commentAVG.avgStar)
    });
  }

  closeModal() {
    this.activeModal.dismiss();
  }
  getUserInfo() {
    this.loginInfo = this.authService.isAuthenticated()
    console.log(this.loginInfo)
    const token = localStorage.getItem('token');
    if (this.loginInfo == true && token) {
      const userRole = this.authService.loginUserInfo(token);
      this.userId = userRole.id;
      this.userName = userRole.name;
    }
    else {
      console.log("Giriş yap")
    }
  }


  createCommentAddForm() {
    this.commentAddForm = this.formBuilder.group({
      commentDescription: ["", Validators.required],
      name: [this.userName],
      productId: [this.productId],
      userId: [this.userId],
      createdDate: [new Date(Date.now())],
      starCount: [""]
    })
  }
  add() {
    if (this.commentAddForm.valid) {
      let commentModel = Object.assign({}, this.commentAddForm.value);
      console.log(commentModel)
      this.commentService.add(commentModel).subscribe({
        next: (response) => {

          this.toastrService.success(response.message, 'Yorum başarıyla eklendi');
          this.clearForm()
          this.getComment(this.productId)
          this.getCommentDetailByProductId(this.productId)
        },
        error: (responseError) => {
          if (responseError.error.message != null) {
            this.toastrService.error(responseError.error.message);
          } else {
            this.toastrService.error('Bir hata oluştu');
          }
        }
      });
    } else {
      this.toastrService.error('Form eksik veya hatalı');
    }
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
    //  this.userRating =this.comments[0].starCount
    });
  }
  


  clearForm() {
    this.myText = '';
    this.selectedRating = 0;
  }
  formatDate(createdDate: Date): string {
    const currentDate = new Date();
    const commentDate = new Date(createdDate);

    const diffInMilliseconds = currentDate.getTime() - commentDate.getTime();

    const seconds = Math.floor(diffInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} gün önce`;
    } else if (hours > 0) {
      return `${hours} saat önce`;
    } else if (minutes > 0) {
      return `${minutes} dakika önce`;
    } else {
      return 'Şimdi';
    }
  }


}
