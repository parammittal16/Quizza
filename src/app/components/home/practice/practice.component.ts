import { Component, OnInit } from '@angular/core';
import { Categories } from '../../../services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  selectedcat: string;
  constructor(private cate: Categories, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedcat = params['id'];
      console.log(params['id']);
    });

  }

}
