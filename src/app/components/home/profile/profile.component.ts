import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: any;
  profileCate: any;

  constructor(private prof: ProfileService) { }

  ngOnInit() {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
    this.prof.getUserDetails(tokenValue)
    .subscribe((data) => {
      console.log('get', data);
      this.profile = data;
      this.profileCate = Object.keys(this.profile.category);
    });
  }

}
