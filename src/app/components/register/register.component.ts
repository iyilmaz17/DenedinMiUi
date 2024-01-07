import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
}) 
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createdRegisterForm();
  }

  createdRegisterForm() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]})
  }

  // passwordMatchValidator(form: FormGroup) {
  //   const passwordControl = form.get('password');
  //   const confirmPasswordControl = form.get('confirmPassword');

  //   if (passwordControl && confirmPasswordControl) {
  //     if (passwordControl.value === confirmPasswordControl.value) {
  //       confirmPasswordControl.setErrors(null);
  //     } else {
  //       confirmPasswordControl.setErrors({ passwordMismatch: true });
  //     }
  //   } else {
  //     // Eğer birisi null ise, uygun bir hata işlemi gerçekleştirilebilir.
  //     console.error("passwordControl veya confirmPasswordControl null değerine sahip.");
  //   }
  // }

  closeModal() {
    this.activeModal.dismiss();
  }

  registerUser() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe({
        next: (response) => {
          {
            localStorage.setItem("token", response.data.token);
            // this.userInfo = this.authService.loginUserInfo(response.data.token)
            //this.toastrService.info(this.userInfo.name, 'Hoşgeldiniz Sn.')
          }
        },
        error: (responseError) => {

          this.toastrService.error(responseError.error)
          console.log("Hata");
        }
      });
    } else {
      // Form valid değilse hata mesajı gösterilebilir
      this.toastrService.error('Lütfen tüm alanları doğru şekilde doldurun', 'Hata');
    }
  }
}
// export class RegisterComponent implements OnInit {
//   registerForm: FormGroup;
//   constructor(
//     public activeModal: NgbActiveModal,
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private toastrService: ToastrService
//   ) { }
//   ngOnInit(): void {
//     this.createdRegisterForm();
//   }
//   createdRegisterForm() {
//     this.registerForm = this.formBuilder.group({
//       username: ["", Validators.required],
//       lastname: ["", Validators.required],
//       email: ["", Validators.required],
//       password: ["", Validators.required]
//     })
//   }
//   closeModal() {
//     this.activeModal.dismiss();
//   }
//   registerUser(){
//   }
// }