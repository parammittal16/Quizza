import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';
import { environment } from '../../environments/environment';


const CHAT_URL = 'ws://10.10.152.19:8000/home/category/science/compete/';

export interface Message {
  result: number;
  status: string;
  message: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  resArray: any;
}

@Injectable()
export class ChatService {

  public messages: Subject<Message>;

  constructor(wsService: WebsocketService) {
    this.messages = <Subject<Message>>wsService
    .connect(CHAT_URL)
    .map((response: MessageEvent): Message => {
      let data = JSON.parse(response.data);
      return {
        result: data.result,
        status: data.status,
        message: data.message,
        question: data.question,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4,
        answer: data.answer,
        resArray: data.resArray
      };
    });
  }
}
