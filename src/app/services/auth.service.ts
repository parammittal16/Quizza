import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService implements OnInit {

  private URL = 'http://10.10.152.19:8000/';
  private isLoggedIn;
  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
  }
  ngOnInit() {
  }

  setLogin() {
    this.isLoggedIn = true;
  }
  getLogin() {
    return this.isLoggedIn;
  }

  getUserDetails_Login(username: string, password: string) {
    return this.http.post(this.URL + 'login/', {
      username,
      password
    });
  }
  getUserDetails_Signup(username: string, email: string, password: string) {
    return this.http.post(this.URL + 'signup/', {
      username,
      email,
      password
    });
  }
}
