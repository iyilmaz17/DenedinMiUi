import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator,
    });
  }

  closeModal() {
    this.activeModal.dismiss('Modal kapatıldı');
  }

  registerUser() {
    
    console.log('Kullanıcı adı:', this.registrationForm.value.username);
    console.log('E-posta:', this.registrationForm.value.email);
    console.log('Şifre:', this.registrationForm.value.password);

    
    this.closeModal();
  }

  private passwordMatchValidator(form: FormGroup) {
    const passwordControl = form.get('password');
    const confirmPasswordControl = form.get('confirmPassword');
  
    
    return passwordControl?.value === confirmPasswordControl?.value
      ? null
      : { passwordMismatch: true };
  }
  
}
