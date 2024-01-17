import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserTokenModel } from 'src/app/models/userTokenModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginForm: FormGroup;
  userInfo: UserTokenModel;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      checkbox1: [true]
    })
  }

  closeModal() {
    this.activeModal.dismiss();
  }
  isAuthenticated(){
    let test = this.authService.isAuthenticated()
    return test
  }
  logOut(){
    this.authService.logout()
  }
  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe({
        next: (response) => {
          if (this.loginForm.value.checkbox1 == true) {
            localStorage.setItem("token", response.data.token);
            this.userInfo = this.authService.loginUserInfo(response.data.token)
            let test = this.authService.isAuthenticated()
            this.closeModal()
            this.toastrService.info(this.userInfo.name, 'Hoşgeldiniz Sn.')
          }
        },
        error: (responseError) => {
          
          this.toastrService.error(responseError.error)
          console.log("Hata");
        }
      });
    }
  }
}
