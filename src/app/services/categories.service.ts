import { Injectable, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class Categories implements OnInit {
  private URL = 'http://10.10.152.19:8000/';
  constructor(private http: HttpClient) {
  }
  ngOnInit() {

  }

  display_categories(token: string) {

  //   let headers: Headers = new Headers();
  // headers.append('Authorization', 'Token 2ed04a684951ed8a647a1a44868ab62f031e9610');
  // let opts: RequestOptions = new RequestOptions();
  // opts.headers = headers;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + token
     });
    const request = this.http.get(this.URL + 'home/category/', {headers: headers});

    return request;
  }
}

// , headers: new HttpHeaders().append('Authorization', 'Token 2ed04a684951ed8a647a1a44868ab62f031e9610')


// display_categories(token: string): Observable<any> {
//   return this.http.get(this.URL + 'home/category/', { headers: new HttpHeaders().set('token', '0a616fefbd0c7901648fc52811872c80d6e82132')
//     }).map();
// }
// }
