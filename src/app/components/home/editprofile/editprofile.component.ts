import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  fileContent: any;
  contents: any;
  reader: FileReader;
  fileExtensionMessage: string;
  fileExtensionError: boolean;
  fileExtension: any;
  allowedExtensions: string[];
  fileName: any;
  file: File = null;
  profile: any;
  profileCate: any;
  delpassword: string;
  oldpassword: string;
  newpassword: string;
  cnfrmpassword: string;
  name: string;
  city: string;
  profilePic: any;
  frmData: any;
  imgUrl: any;

  constructor(private prof: ProfileService) { }

  ngOnInit() {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
    this.prof.getUserDetails(tokenValue)
    .subscribe((data) => {
      console.log('initial', data);
      this.profile = data;
      this.name = this.profile.name;
      this.city = this.profile.city;
      this.imgUrl = this.profile.profile_pic;
    });

  }

  onSent(form: NgForm) {
    this.frmData = new FormData();
    this.frmData.append('profile_pic', this.file, this.fileName);
    this.frmData.append('name', this.name);
    this.frmData.append('city', this.city);
    console.log(this.file , this.fileName , this.frmData);
    console.log(this.name);
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
    this.prof.changeUserDetails(tokenValue, this.frmData, this.name , this.city)
    .subscribe((data) => {
      console.log(data);
    });

  }
  fileEvent(event) {
    this.file = <File>event.target.files[0];
    console.log(this.file);
    const reader = new FileReader();
    reader.onload = (e: any) => {
        this.imgUrl = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.fileName = this.file.name;
    this.allowedExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    this.fileExtension = this.fileName.split('.').pop();

    if (this.isInArray(this.allowedExtensions, this.fileExtension)) {
      this.fileExtensionError = false;
      this.fileExtensionMessage = '';
    } else {
      this.fileExtensionMessage = 'Only jpg and png are allowed!!';
      this.fileExtensionError = true;
    }
    if (this.file) {
      this.reader = new FileReader();
      this.reader.onloadend = (e: any) => {
        this.contents = e.target.result;
        this.fileContent = this.contents;
      };
      this.reader.readAsDataURL(this.file);
    } else {
      alert('Failed to load file');
    }
  }
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }
  onDel(form3: NgForm) {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
    console.log(this.delpassword);
    this.prof.deleteAccount(tokenValue, this.delpassword)
    .subscribe((data) => {
      console.log(data);
    });
  }
  onChangePass(form2: NgForm) {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
    console.log(this.newpassword);
    console.log(this.oldpassword);
    console.log(this.cnfrmpassword);

    this.prof.changePass(tokenValue, this.newpassword, this.oldpassword, this.cnfrmpassword)
    .subscribe((data) => {
      console.log(data);
    });
  }

}
