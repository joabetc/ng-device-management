import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { MessageTypes } from '../model/message-types';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];

  constructor() { }

  private add(type: MessageTypes, message: string) {
    let msg: Message = {
      type: type,
      message: message
    }
    this.messages.push(msg);
  }

  addSuccess(message: string) {
    this.add(MessageTypes.SUCESS, message);
  }

  addInfo(message: string) {
    this.add(MessageTypes.INFO, message);
  }

  addWarning(message: string) {
    this.add(MessageTypes.WARNING, message);
  }

  addError(message: string) {
    this.add(MessageTypes.DANGER, message);
  }

  remove(index: number) {
    this.messages.splice(index, 1);
  }

  clear() {
    this.messages = [];
  }
}
