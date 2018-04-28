import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  onSignup(form: NgForm) {
    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    this.auth.getUserDetails_Signup(username, email, password)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/mail']);
    });
    console.log(username);
    console.log(email);
    console.log(password);

  }
}
