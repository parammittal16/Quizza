import { Component, OnInit, Renderer2, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionService } from '../../../services/question.service';
import { ChatService } from '../../../services/chat.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-instruction-compete',
  templateUrl: './instruction-compete.component.html',
  styleUrls: ['./instruction-compete.component.scss']
})
export class InstructionCompeteComponent implements OnInit {
  finalResult2: any;
  resultShow: boolean;
  finalResult: any;
  noq: number;
  tpq: number;
  score: number;
  count: number;
  id: any;
  text1: string;
  text2: string;
  public now: Date;
  private message =  {
    result: -5,
    status: '',
    message: '',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    resArray: {},
  };
  selectedlevel: string;
  timeandcount: any;
  selectedcat: string;
  insShow: boolean;
  opt: string;
  ans: string;
  question: any;
  imageShow: boolean;
  currentQuestion: number;


  @ViewChild('counter')
  public myCounter: ElementRef;
  constructor(private zone: NgZone, private renderer: Renderer2, private route: ActivatedRoute, private http: HttpClient, private q: QuestionService, private chatService: ChatService) {
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;

    this.route.params.subscribe(params => {
      this.selectedcat = params['id'];
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + tokenValue
    });

    this.http.get('http://10.10.152.19:8000/home/category/' + this.selectedcat + '/compete/instruction/', {headers: headers})
    .subscribe((data) => {
      this.timeandcount = data;
      console.log(data);
      this.tpq = this.timeandcount.time_per_question;
      this.noq = this.timeandcount.count;
      this.q.setQuestionsInfo(this.timeandcount.count, this.timeandcount.time_per_question);
    },
    err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.resultShow = false;
    this.score = 0;
    this.insShow = true;
    this.imageShow = true;
    this.text1 = 'Gathering Your Oponents....';
    this.text2 = 'The game is about to start';
    this.currentQuestion = 0;
    this.chatService.messages
    .subscribe(msg => {
      this.currentQuestion += 1;
      this.zone.runOutsideAngular(() => { clearInterval(this.id); });
      if (this.currentQuestion > 0 && this.currentQuestion <= this.noq) {
        this.imageShow = false;
        this.count = this.tpq;
        this.zone.runOutsideAngular(() => {
          this.id = setInterval(() => {
            this.renderer.setProperty(this.myCounter.nativeElement, 'textContent', this.count--);

            if (this.count === 1   ) {
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

      }
      this.question = msg;
      if (this.question.status === 'done') {
        this.imageShow = true;
        this.text1 = 'Quiz Completed...';
        this.text2 = 'Wait for the result';
        this.message.result = this.score;
        console.log(this.message);
        this.chatService.messages.next(this.message);
      } else if (this.question.status === 'no') {
        this.imageShow = true;
        this.text1 = 'A game is in progress';
        this.text2 = 'Try after some time';
      } else if (this.question.status === 'your score') {
        this.imageShow = false;
        this.resultShow = true;
        this.finalResult = Object.keys(this.question.resArray['0']);
        this.finalResult2 = Object.values(this.question.resArray['0']);
      }
      console.log(msg);
    });
  }
  selectedAnswer(answer: string, option: string) {
    this.ans = answer;
    this.opt = option;
  }

  sendToken() {
    this.insShow = false;
    // let todayDate = (Date.parse(Date()));
    // console.log(todayDate);
    const tokenObject = JSON.parse(localStorage.getItem('token'));
    const tokenValue = tokenObject.token;
    console.log('new message from client to websocket: ', this.message);
    this.message.message = tokenValue;
    // this.message.time = todayDate;
    this.chatService.messages.next(this.message);
  }


}
