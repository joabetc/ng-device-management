import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { MessageTypes } from '../model/message-types';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  message = new Subject<Message>();
  private keepAfterRouteChange = false;

  messages: Message[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      }
    });
  }

  getAlerts(): Observable<any> {
    return this.message.asObservable();
  }

  private add(type: MessageTypes, message: string) {
    const msg: Message = {
      type,
      message
    };
    this.messages.push(msg);
    this.message.next({ type, message } as Message);
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
