import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProfileService {

  private URL = 'http://10.10.152.19:8000/';

  constructor(private http: HttpClient) { }

  getUserDetails(token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + token
     });
    const request = this.http.get(this.URL + 'home/profile/', {headers: headers});

    return request;
  }
  changeUserDetails(token: string, file: any, name: string, city: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + token
     });
    const request = this.http.put(this.URL + 'home/profile/', file, {headers: headers});
    return request;
  }
  deleteAccount(token: string, password: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + token
     });
     const request = this.http.post(this.URL + 'home/profile/delete', { password }, { headers: headers });
     return request;
  }
  changePass(token: string, new_password: string, old_password: string, new_conf_pass: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + token
     });
     console.log(headers);
     console.log({ new_password, old_password, new_conf_pass });
     const request = this.http.post(this.URL + 'home/profile/change_password/', { new_password, old_password, new_conf_pass }, { headers: headers });
     return request;
  }

}
