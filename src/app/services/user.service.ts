import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  helper = new JwtHelperService();
  userInfo: any;

  constructor() { }

  getInfo() {
    return this.helper.decodeToken(this.getToken() || "");
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  
  getToken() {
    return localStorage.getItem('token');
  }
    
  deleteToken() {
    localStorage.removeItem('token');
  }
  
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
}
