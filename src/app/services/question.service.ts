import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class QuestionService implements OnInit {

  private numberOfQuestions: number;
  private timePerQuestion: number;
  private selectedLevel: string;
  private selectedCat: string;
  private token: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.token = '2ed04a684951ed8a647a1a44868ab62f031e9610';
  }
  setLevelCategory(level: string, Category: string) {
    this.selectedLevel = level;
    this.selectedCat = Category;
  }
  setQuestionsInfo(noq: number, tpq: number) {
    this.numberOfQuestions = noq;
    this.timePerQuestion = tpq;
  }
  getNumberOfQuestions() {
    return this.numberOfQuestions;
  }
  getTimePerQuestion() {
    return this.timePerQuestion;
  }
  getQuestion(questionNo: number, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + token
     });
    return this.http.get('http://10.10.152.19:8000/home/category/' + this.selectedCat + '/practice/' + this.selectedLevel + '/start/' + questionNo + '/', {headers: headers});
  }
  postresult(all_score: number, token: string) {
    const headers2 = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + token
     });
    return this.http.post('http://10.10.152.19:8000/home/category/' + this.selectedCat + '/practice/' + this.selectedLevel + '/result/',
    { all_score }, {headers: headers2});
  }

}
