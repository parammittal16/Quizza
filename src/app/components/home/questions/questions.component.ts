import { Component, OnInit, OnDestroy, ViewChild, ElementRef, NgZone, Renderer2 } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  private alive: boolean;
  private tpq: number;
  private noq: number;
  currentQuestion: number;
  question: any;
  count: number;
  id: any;
  opt: string;
  ans: string;
  score: number;


  @ViewChild('counter')
  public myCounter: ElementRef;


  constructor(private ques: QuestionService, private route: ActivatedRoute, private zone: NgZone, private renderer: Renderer2) {
    this.alive = true;
    this.score = 0;
    this.currentQuestion = 0;
    this.tpq = this.ques.getTimePerQuestion();
    this.noq = this.ques.getNumberOfQuestions();
    this.count = this.tpq - 1;
  }
  ngOnInit() {
    this.score = 0;
    this.zone.runOutsideAngular(() => {
      this.id = setInterval(() => {
        this.renderer.setProperty(this.myCounter.nativeElement, 'textContent', this.count--);

    if (this.count === 2   ) {
      console.log(this.question.answer);
      console.log(this.ans);
      if (this.ans === this.question.answer) {
        this.score++;
        console.log(this.score);
      }
      this.ans = '';
      this.opt = '';
    }
      }, 1000);
    });

    this.route.params.subscribe(params => {
      this.ques.setLevelCategory(params['id2'], params['id']);
      console.log(params['id2']);
    });

    TimerObservable.create(0, this.tpq * 1000)
    .takeWhile(() => {
      if (this.alive === false) {
        const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
        this.zone.runOutsideAngular(() => { clearInterval(this.id); });
        this.ques.postresult(this.score, tokenValue)
        .subscribe((data) => {
          console.log(data);
        });
      }
      return this.alive;
    })
    .subscribe(() => {
      const tokenObject = JSON.parse(localStorage.getItem('token'));
      const tokenValue = tokenObject.token;
      this.ques.getQuestion(++this.currentQuestion, tokenValue)
      .subscribe((data) => {
        console.log(data);
        this.count = this.tpq - 1;
        if (this.currentQuestion === this.noq ) {
          this.alive = false;
        }
        this.question = data;
      });
    });


  }
  selectedAnswer(answer: string, option: string) {
    this.ans = answer;
    this.opt = option;
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
