import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  filterText = "";
  categories: Category[] = [];
  constructor(private modalService: NgbModal, private categoryService: CategoryService, private authService: AuthService) { }
  ngOnInit(): void {
    this.getCategories()
  }
  isAuthenticated() {
    let test = this.authService.isAuthenticated()
    return test
  }
  logOut() {
    this.authService.logout()
  }
  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then(
      (result) => {
        console.log(result);
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
  openRegistrationModal() {

    const modalRef = this.modalService.open(RegisterComponent, { backdrop: 'static', keyboard: false });
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }
}
