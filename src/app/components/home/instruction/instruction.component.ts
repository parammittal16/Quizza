import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionService } from '../../../services/question.service';


@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.scss']
})
export class InstructionComponent implements OnInit {

  selectedlevel: string;
  timeandcount: any;
  selectedcat: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private q: QuestionService) {
  }
  ngOnInit() {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
      const tokenValue = tokenObject.token;

    this.route.params.subscribe(params => {
      this.selectedlevel = params['id2'];
      this.selectedcat = params['id'];
      console.log(params['id2']);
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + tokenValue
     });

    this.http.get('http://10.10.152.19:8000/home/category/' + this.selectedcat + '/practice/' + this.selectedlevel + '/instruction/', {headers: headers})
    .subscribe((data) => {
      this.timeandcount = data;
      this.q.setQuestionsInfo(this.timeandcount.count, this.timeandcount.time_per_ques);
      },
      err => {
        console.log(err);
      });
}

}
