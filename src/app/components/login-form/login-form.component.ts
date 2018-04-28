import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onLogin(form: NgForm) {
    const lusername = form.value.lusername;
    const lpassword = form.value.lpassword;
    this.auth.getUserDetails_Login(lusername, lpassword)
    .subscribe(data => {
      if (data) {
        console.log(data);
        localStorage.setItem('token', JSON.stringify(data));
        console.log(this.auth.getLogin());
        this.auth.setLogin();
        console.log(this.auth.getLogin());
        console.log(localStorage.getItem('token'));
        this.router.navigate(['/home']);
    }
    },
  err => {
    console.log(err);
  });
    console.log(lusername);
    console.log(lpassword);

  }
}
