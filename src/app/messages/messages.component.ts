import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../shared/services/messages.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { timer } from 'rxjs';
import { Alert } from '../shared/model/alert';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('5s')
      ])
    ])
  ]
})
export class MessagesComponent implements OnInit {
  isOpen = true;

  messages: Alert[] = [];

  constructor(
    public messageService: MessagesService
  ) { }

  ngOnInit(): void {
    this.messageService.getAlerts().subscribe((alert: Alert) => {
      if (!alert) {
        this.messages = [];
        return;
      }

      alert.visible = true;
      this.messages.push(alert);
      timer(5000).subscribe(i => {
        this.messages.find(x => x === alert).visible = false;
      });
      timer(10000).subscribe(i => {
        console.log('removing');
        this.messages = this.messages.filter(x => x !== alert);
      });
    });
  }

  removeMessage(index: number) {
    this.messageService.remove(index);
    this.messages.splice(index, 1);
  }

}
