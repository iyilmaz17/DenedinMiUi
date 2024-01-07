import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent {
  constructor(private modalService: NgbModal) {}

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
}
