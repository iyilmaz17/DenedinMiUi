import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserTokenModel } from '../models/userTokenModel';
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userRole!:UserTokenModel;
  apiUrl = 'https://localhost:7247/api/Auth/'
  constructor(private httpClient: HttpClient) { 
    
  }
  login(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }
  register(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }
  loginUserInfo(token: string): UserTokenModel {
    this.userRole = JSON.parse(atob(token.split('.')[1])) as UserTokenModel
    return this.userRole
  }
  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }
}
