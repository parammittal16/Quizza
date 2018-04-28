import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-compete',
  templateUrl: './compete.component.html',
  styleUrls: ['./compete.component.scss']
})
export class CompeteComponent {
  opt: string;
  ans: string;
  question: any;
  imageShow: boolean;
  currentQuestion: number;
  private message = {
    author: 'tutorialedge',
    message: 'sdfsd'
  };
  /* constructor(private chatService: ChatService) {
    this.imageShow = true;
    this.currentQuestion = 0;
    this.chatService.messages
    .subscribe(msg => {
      this.currentQuestion += 1;
      if (this.currentQuestion > 0) {
        this.imageShow = false;
      }
      this.question = msg;
      console.log(msg);
      console.log('Response from websocket: ' + JSON.stringify(msg));
    });
  } */
  selectedAnswer(answer: string, option: string) {
    this.ans = answer;
    this.opt = option;
  }

  // ngAfterViewInit() {
  //   const tokenObject = JSON.parse(localStorage.getItem('token'));
  //   const tokenValue = tokenObject.token;
  //   console.log('new message from client to websocket: ', this.message);
  //   this.message.message = tokenValue;
  //   this.chatService.messages.next(this.message);
  // }



  // sendMsg() {
  //   const tokenObject = JSON.parse(localStorage.getItem('token'));
  //   const tokenValue = tokenObject.token;
  //   console.log('new message from client to websocket: ', this.message);
  //   this.chatService.messages.next(this.message);
  //   this.message.message = tokenValue;
  // }

}
