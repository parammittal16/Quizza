import { Component, OnInit } from '@angular/core';
import { Categories } from '../../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  constructor(private cat: Categories) {
   }

   categories: any;

   ngOnInit() {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
    this.cat.display_categories(tokenValue)
    .subscribe(data => {
        this.categories = data;
    },
  err => {
    console.log(err);
  });
  }

}
