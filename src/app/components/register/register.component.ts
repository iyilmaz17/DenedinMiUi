import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserTokenModel } from 'src/app/models/userTokenModel';
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
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }


  closeModal() {
    this.activeModal.dismiss();
  }

  registerUser() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      console.log(registerModel)
      this.authService.register(registerModel).subscribe({
        next: (response) => {
          console.log(response.data)
          localStorage.setItem("token", response.data.token);
          this.closeModal()
          this.toastrService.info( 'Kayıt başarılı');
        },
        error: (responseError) => {
          this.toastrService.error(responseError.error);
          console.log("Hata");
        }
      });
    } else {
      this.toastrService.error('Lütfen tüm alanları doğru şekilde doldurun', 'Hata');
    }
  }
}